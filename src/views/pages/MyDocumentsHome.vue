<template>
  <div class="main-container">
    <div class="mydocuments__icon-container">
      <MyDocuments/>
    </div>
    <div class="mydocuments__description-container">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>
    
    
  </div>
</template>

<script>
import MyDocuments from '../../assets/svg/my-documents.svg'
import ArrowRight from '../../assets/svg/arrow-right.svg'

export default {
  components: { MyDocuments, ArrowRight },
}
</script>

<style scoped>

  .main-container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .mydocuments__icon-container {
    width: 400px;
    height: 300px;
  }

  .mydocuments__description-container {
    width: 100%;
  }

</style>