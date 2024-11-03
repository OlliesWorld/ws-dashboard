<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { fetchMultipleData } from "$lib/utils/fetchUtils";
  import { getToday } from "$lib/utils/dateUtils";
  import "../../app.css";
  import Card from "$lib/components/Card.svelte";

  const { day, date } = getToday();
  let news;
  /** @type {Array<{ headline: string, description: string, links: { web: { href: string } } }>} */
  let articles = [];
  let scores;
  /** @type {Array<{ name: string }>} */
  let events = [];
  let competitions = [];
  let teams = [];
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
      // @ts-ignore
      competitions = events.map((event) => event.competitions || []).flat();
      // console.log('events', events);
      // console.log("competitions", competitions);
      teams = competitions
        .map((competition) =>
          competition.competitors.map((competitor) => ({
            abbreviation: competitor.team.abbreviation,
            score: competitor.score,
          })),
        )
        .flat();
      // console.log("teams", teams);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  
  function getHighestScore(competitors) {
    const highestScore = Math.max(...competitors.map(competitor => competitor.score));
    console.log('Highest Score:', highestScore);
    return highestScore;
  }
</script>

<div class="container">
  <h1>NCAA Soccer ⚽️</h1>
  <p>This will be the place for all NCAA Soccer stuffs!</p>

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
            </p>
            {/each}
          </div>
        {/each}
        </details>
      {/each}
    </div>
  </div>
</div>
