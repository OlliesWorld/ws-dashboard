<!-- src/lib/components/Card.svelte -->
<script>
  export let headline = '';
  export let link = '';
</script>

<article class="card">
  <header>{headline}</header>
  <!-- <p>{description}</p> -->
  <footer><a href={link} target="_blank" rel="noopener noreferrer">article link</a></footer>
</article>

<style>
  .card {
    /* Add your card styles here */
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>