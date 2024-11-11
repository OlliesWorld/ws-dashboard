<script>
  export let name;
  export let selected = false;
  export let onClick;
</script>

<style>
  .tab {
    cursor: pointer;
    padding: 10px;
    border-bottom: 2px solid transparent;
  }
  .tab.selected {
    border-bottom: 2px solid var(--primary);
  }
</style>

<button class="tab outline {selected ? 'selected' : ''}" on:click={onClick}>
  {name}
</button>