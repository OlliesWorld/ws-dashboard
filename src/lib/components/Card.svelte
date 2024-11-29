<!-- src/lib/components/Card.svelte -->
<script>
  export let headline = '';
  export let link = '';
</script>
<a href={link} target="_blank" rel="noopener noreferrer">
<article class="card">
  <header>{headline}</header>
  <!-- <p>{description}</p> -->
  <!-- <footer><a href={link} target="_blank" rel="noopener noreferrer">article link</a></footer> -->
</article>
</a>
<style>
 a {
    text-decoration: none;
    /* color: inherit; */
 }

 .card {
    /* Add your card styles here */
    border: 1px solid rgb(78, 179, 27);
    padding: 1rem 1rem 0;
    margin: 1rem 0;
    border-radius: 12px;
  }
  .card:hover {
    
    box-shadow:  6px 10px rgb(78, 179, 27);
  }
  header {
    margin-bottom: 0;
    border-radius: 12px;
  }
 

</style>