<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fetchData } from "$lib/utils/fetchUtils";
  import "../../app.css";
  import Card from "$lib/components/Card.svelte";
  import { slide } from "svelte/transition";

  let news;
  /** @type {Array<{ headline: string, description: string, links: { web: { href: string } } }>} */
  let articles = [];
  let scores;
  /** @type {Array<{ name: string }>} */
  let events = [];
  let isLoading = true;

  onMount(async () => {
    try {
      const newsData = await fetchData(
        "HTTPS://site.api.espn.com/apis/site/v2/sports/basketball/wnba/news?limit=7",
      );

      news = newsData;
      articles = news.articles || [];
      // scores = scoresData;
      // events = scores.events || [];
      // console.log('events', events);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading = false;
    }
  });
</script>
{#if isLoading}
<div class="container">
  <p>Loading...</p>
</div>
{:else}
<div class="container" transition:slide={{ x: -800, duration: 800 }}>
  <h2>Scores:</h2>
  <div class="score-container">
      <div class="grid">
        {#if events.length === 0}
        <p>Off season, checkout 👀 the news below 👇</p>
      {/if}
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
    <h2>News</h2>
    <div class="card-container">
      {#each articles as article}
        <Card headline={article.headline} link={article.links.web.href} />
      {/each}
    </div>

  </div>
{/if}
<style>
  


  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
   row-gap: 1rem;
  }
</style>
