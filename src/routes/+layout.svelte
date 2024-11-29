<script>
  // @ts-nocheck
  import { onMount, afterUpdate } from "svelte";
  import NavBar from "$lib/components/NavBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Tab from "$lib/components/Tab.svelte";

  let pageName = "";
  let selectedTab = "Home";

  $: {
    const { route } = $page;
    if (route.id === "/wnba") {
      pageName = "WNBA 🏀";
      selectedTab = "WNBA";
    } else if (route.id === "/ncaa-basketball") {
      pageName = "NCAA Basketball 🏀";
      selectedTab = "NCAA Basketball";
    } else if (route.id === "/ncaa-volleyball") {
      pageName = "NCAA Volleyball 🏐";
      selectedTab = "NCAA Volleyball";
    } else if (route.id === "/ncaa-softball") {
      pageName = "NCAA Softball";
      selectedTab = "NCAA Softball";
    } else if (route.id === "/nwsl") {
      pageName = "NWSL ⚽️";
      selectedTab = "NWSL";
    } else {
      pageName = "Home";
      selectedTab = "Home";
    }
  }

  function selectTab(tab) {
    selectedTab = tab;
    // Navigate to the corresponding route
    if (tab === "WNBA") {
      goto("/wnba");
    } else if (tab === "NWSL") {
      goto("/nwsl");
    } else if (tab === "NCAA Basketball") {
      goto("/ncaa-basketball");
    } else if (tab === "NCAA Volleyball") {
      goto("/ncaa-volleyball");
    } else {
      goto("/");
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.green.min.css"
  />
</svelte:head>

<NavBar {pageName} />
<main class="container-fluid">
  <div class="tabs">
    <Tab
      name="WNBA 🏀"
      selected={selectedTab === "WNBA"}
      onClick={() => selectTab("WNBA")}
    />
    <Tab
      name="NWSL ⚽️"
      selected={selectedTab === "NWSL"}
      onClick={() => selectTab("NWSL")}
    />
    <Tab
      name="NCAA Basketball 🏀"
      selected={selectedTab === "NCAA Basketball"}
      onClick={() => selectTab("NCAA Basketball")}
    />
    <Tab
      name="NCAA Volleyball 🏐"
      selected={selectedTab === "NCAA Volleyball"}
      onClick={() => selectTab("NCAA Volleyball")}
    />
    <!-- <Tab
      name="NCAA Softball"
      selected={selectedTab === "NCAA Softball"}
      onClick={() => selectTabb("NCAA Softball")}
    /> -->
  </div>
    <slot />
  </main>
  <Footer />

<style>
  :root {
    --primary: #398712;
  }
  .tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }


</style>
