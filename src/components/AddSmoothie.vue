<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add Smoothie</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field ingredient" v-if="ingredients.length > 0">
        <label for="add-ingredient">Ingredients:</label>
        <p v-for="(ing, index) in ingredients" :key="index" class="chip">
          {{ ing }}
          <i class="material-icons delete" @click="deleteIng(index)">clear</i>
        </p>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredient:</label>
        <input placeholder="Press Tab to add Ingredient" type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = "You must enter a title to be able to submit"
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = "You must enter a value to add an ingredient"
      }
    },
    deleteIng(index) {
      this.ingredients = this.ingredients.filter( ing => {
        return this.ingredients[index] != ing
      })
    }
  }
}
</script>

<style>
.add-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field{
  margin: 20px auto;
}
.add-smoothie .delete{
    margin-top: 0px;
    cursor: pointer;
    color: #aaa;
    font-size: 15px;
    vertical-align: middle;
}
</style>
