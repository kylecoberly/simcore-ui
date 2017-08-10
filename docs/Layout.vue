<template lang="html">
  <div class="app-content">

    <main>
      <router-view name="content"></router-view>
    </main>

    <aside>
      <router-view name="sidebar"></router-view>
    </aside>

  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss">
.app-content {
  position: relative;
  z-index: 0;
  transition: all calc(var(--ms) / 2) ease-out;
  display: flex;
  flex-direction: row-reverse;
  > main,
  > aside {
    padding: 1em;
  }
  > main {
    flex: 1;
    > h1 {
      margin-top: 0;
    }
  }
  > aside {
    flex: .2;
    color: var(--panel-fg);
    background: var(--panel-bg);
    transition: all calc(var(--ms) / 2) ease-out;
  }
  header {
    position: sticky;
    top: 4em;
  }
}
</style>
