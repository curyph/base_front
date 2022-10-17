<template>
  <h1>TEMPLATE DE FARM DETAILS</h1>
  <h4>Selected State: {{ state }} </h4>
  <h4>Selected City: {{ city }}</h4>
</template>

<script>
export default {
    data() {
            return {
                state: this.$route.params.state,
                city: this.$route.params.city,               
            }
        }
}
</script>

<style>

</style>