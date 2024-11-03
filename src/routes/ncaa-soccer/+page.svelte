<script>
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
      console.log('events', events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
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
          <p>...</p>
        </details>
      {/each}
    </div>
  </div>
</div>
