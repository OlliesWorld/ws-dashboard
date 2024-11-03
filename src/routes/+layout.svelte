<script>
  import '@picocss/pico'
  import '../app.css'
  import NavBar from '$lib/components/NavBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>
 <main class="container-fluid">
<NavBar ></NavBar>
  
<slot />
<Footer></Footer>
</main>