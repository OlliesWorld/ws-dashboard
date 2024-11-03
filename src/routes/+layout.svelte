<script>
  import { onMount } from 'svelte';
  import '@picocss/pico';
  import '../app.css';
  import NavBar from '$lib/components/NavBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  let pageName = '';

  $: {
    const { route } = $page;
    if (route.id === '/wnba') {
      pageName = 'WNBA 🏀';
    } else if (route.id === '/ncaa-basketball') {
      pageName = 'NCAA Basketball 🏀';
    } else {
      pageName = 'Home';
    }
  }
</script>
<style>
  :root {
    --primary: #398712;
   
  }

</style>
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.green.min.css" />
</svelte:head>

<main class="container-fluid">
  <NavBar {pageName} />
  <slot />
  <Footer />
</main>