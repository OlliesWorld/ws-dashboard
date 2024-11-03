<script>
  import { onMount } from 'svelte';
  import { fetchMultipleData } from '$lib/utils/fetchUtils';
  import { getToday } from '$lib/utils/dateUtils';
  import '../../app.css';

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
        'https://site.api.espn.com/apis/site/v2/sports/soccer/usa.nwsl/news?limit=5',
        'https://site.api.espn.com/apis/site/v2/sports/soccer/usa.nwsl/scoreboard'
      ]);

      news = newsData;
      articles = news.articles || [];
      scores = scoresData;
      events = scores.events || [];
      // console.log('events', events);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
</script>
<section class=" ">
  <h1>NCAA Soccer ⚽️</h1>
  <p>This will be the place for all NCAA Soccer stuffs!</p>
  <p>News:</p>
  <div class="card-container">
    {#each articles as article}
    <article>
      <header>{article.headline}</header>
      <p>{article.description}</p>
      <footer><a href={article.links.web.href}>article link</a></footer>
    </article>
    {/each}
  </div>
<div>
    <p>Scores for {day}, {date}</p>
    <div>
    {#each events as event}
        <details open>
        <summary>{event.name}</summary>
        <p>...</p>
        </details>
        {/each}
    </div>
</div>
</section>
