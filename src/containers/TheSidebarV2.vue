<template>
  <div class="side-bar__panel">
    <ul class="side-bar__menus">
      <li v-for="(item, idx) in $options.nav"
        :key="idx"
        class="side-bar__menu-item"
        :class="{ 'active': $route.path.includes(item.to) }"
        v-b-tooltip.hover
        :title="item.name">
        <a :href="`#${item.to}`" class="side-bar__menu-link">
          <v-icon :name="item.icon" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import nav from './_nav-v2';
  export default {
    name: 'TheSidebarV2',
    nav
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/shared.scss";

  .side-bar__panel {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100%;
    width: $side-bar-width;
    border-right: 1px solid $light-gray-200;
    background-color: $dark-gray-600;
    z-index: 1031;
  }

  .side-bar__menus {
    margin: 0;
    margin-top: 30px !important;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .side-bar__menu-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

     &.active {
      .side-bar__menu-link {
        background-color: $brand-primary;
        border-radius: 3px;
      }

      svg * {
        color: $maroon !important;
        fill: $maroon !important;
      }
    }
  }

  .side-bar__menu-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    padding: 10px;
    margin: 7px 0;
    transition: border-radius 250ms cubic-bezier(.215,.61,.355,1),background-color 300ms cubic-bezier(.39,.575,.565,1);

    &:hover {
      background-color: $brand-primary;
      border-radius: 3px;
    }

    svg {
      height: 100%;
      width: auto;
      max-width: 100%;
      color: $white;
    }
  }
</style>
