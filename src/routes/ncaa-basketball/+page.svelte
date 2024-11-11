<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { fetchData } from "$lib/utils/fetchUtils";
  import { getToday } from "$lib/utils/dateUtils";
  import "../../app.css";
  import Card from "$lib/components/Card.svelte";
  import { slide } from "svelte/transition";
  const { day, date } = getToday();
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
        "HTTPS://site.api.espn.com/apis/site/v2/sports/basketball/womens-college-basketball/news?limit=7",
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
  <p>Loading...</p>
{:else}
  <div class="container" transition:slide={{ x: -800, duration: 800 }}>
    <h2>News for Today <span class="underline">{day}, {date}</span></h2>
    <div class="card-container">
      {#each articles as article}
        <Card headline={article.headline} link={article.links.web.href} />
      {/each}
    </div>
    <p>Scores:</p>
  </div>
{/if}
