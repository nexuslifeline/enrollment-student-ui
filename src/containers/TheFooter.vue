<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} <a href="http://stcedu.net/" target="_blank">Saint Theresa College of Tandag Inc.</a></span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">version: </span>
      {{version}}
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      version: process.env.VUE_APP_API_VERSION
    }
  },
}
</script>
