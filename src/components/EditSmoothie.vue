<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smootie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div class="field ingredient" v-if="smoothie.ingredients.length > 0">
        <label for="add-ingredient">Ingredients:</label>
        <p v-for="(ing, index) in smoothie.ingredients" :key="index" class="chip">
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
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>

  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
      ingredients: []
    }
  },
  created() {
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      })
    })
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
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
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = "You must enter a value to add an ingredient"
      }
    },
    deleteIng(index) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter( ing => {
        return this.smoothie.ingredients[index] != ing
      })
    }
  }
}
</script>

<style lang="css">
.edit-smoothie{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field{
  margin: 20px auto;
}
.edit-smoothie .delete{
    margin-top: 0px;
    cursor: pointer;
    color: #aaa;
    font-size: 15px;
    vertical-align: middle;
}
</style>
