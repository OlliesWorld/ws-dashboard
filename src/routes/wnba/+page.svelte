<script>
    import { onMount } from 'svelte';
    import { fetchData } from '$lib/utils/fetchUtils';
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
        const newsData = await fetchData(
          'HTTPS://site.api.espn.com/apis/site/v2/sports/basketball/wnba/news?limit=7'
    );
  
        news = newsData;
        articles = news.articles || [];
        // scores = scoresData;
        // events = scores.events || [];
        // console.log('events', events);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  </script>

<h1>WNBA 🏀</h1>
<p>This will be the place for all WNBA stuffs!</p>
<p>News for Today {day}, {date}</p>
<div class="card-container">
    {#each articles as article}
    <article>
      <header>{article.headline}</header>
      <!-- <p>{article.description}</p> -->
      <footer><a href={article.links.web.href}>article link</a></footer>
    </article>
    {/each}
  </div>
<p>Scores:</p>
