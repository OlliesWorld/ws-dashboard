<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fetchMultipleData } from "$lib/utils/fetchUtils";
  import { getToday } from "$lib/utils/dateUtils";
  import "../../app.css";
  import Card from "$lib/components/Card.svelte";
  import { slide } from 'svelte/transition';

  const { day, date } = getToday();
  let news;
  /** @type {Array<{ headline: string, description: string, links: { web: { href: string } } }>} */
  let articles = [];
  let scores;
  /** @type {Array<{ name: string }>} */
  let events = [];
  let competitions = [];
  let teams = [];
  let isLoading = true;

  onMount(async () => {
    try {
      const [newsData, scoresData] = await fetchMultipleData([
        "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.nwsl/news?limit=5",
        "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.nwsl/scoreboard",
      ]);

      news = newsData;
      articles = news.articles || [];
      scores = scoresData;
      events = scores.events || [];
      competitions = events.map((event) => event.competitions || []).flat();
      teams = competitions
        .map((competition) =>
          competition.competitors.map((competitor) => ({
            abbreviation: competitor.team.abbreviation,
            score: competitor.score,
          })),
        )
        .flat();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading = false;
    }
  });

  function getHighestScore(competitors) {
    const highestScore = Math.max(...competitors.map(competitor => competitor.score));
    return highestScore;
  }
</script>

{#if isLoading}
  <p>Loading...</p>
{:else}
  <div class="container" transition:slide={{ x: -800, duration: 800 }}>
    <h2>News: <span class="underline">{day}, {date}</span></h2>
    <div class="card-container">
      {#each articles as article}
        <Card headline={article.headline} link={article.links.web.href} />
      {/each}
    </div>
    <div>
      <h2>Scores: <span class="underline">{day}, {date}</span></h2>
      <div class="score-container">
        {#each events as event}
          <details>
            <summary>{event.name}</summary>
            {#each event.competitions as competition}
            <div>
              {#each competition.competitors as competitor}
              <p class:highest-score={competitor.score === getHighestScore(competition.competitors)}>
                {competitor.team.abbreviation}: {competitor.score}
                {#if competitor.score === getHighestScore(competition.competitors)}
                  <span>(Highest Score)</span>
                {/if}
              </p>
              {/each}
            </div>
          {/each}
          </details>
        {/each}
      </div>
    </div>
  </div>
{/if}
