<script>
  import { onMount } from "svelte";
  import { fetchData } from "$lib/utils/fetchUtils";
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
    }
  });
</script>

<div class="container">
  <p>This will be the place for all WNBA stuffs!</p>

  <h2>News for Today <span class="underline">{day}, {date}</span></h2>
  <div class="card-container">
    {#each articles as article}
      <Card headline={article.headline} link={article.links.web.href} />
    {/each}
  </div>
  <p>Scores:</p>
</div>
