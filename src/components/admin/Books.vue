<template>
  <div>
    <h1>Livros à venda</h1>

    <button type="button" class="btn btn-primary" @click="add">+</button>

    {{books}}

    <ol>
      <li
        v-for="book in books"
        :key="book.id"
        v-if="books.length">
        <ul>
          <li>id: {{book.id}}</li>
          <li>publishingCompany: {{book.publishingCompany}}</li>
          <li>edition: {{book.edition}}</li>
          <li>author: {{book.author}}</li>
          <li>title: {{book.title}}</li>
          <li>isSale: {{book.isSale}}</li>
          <li>value: {{book.value}}</li>
          <li>
            <button
              type="button"
              class="btn btn-danger"
              @click="remove(book.id)">
              x
            </button>
          </li>
        </ul>
      </li>
      <li
        v-else-if="!books">
          carregando...
      </li>
      <li
        v-else>
          Nenhum livro à venda
        </li>
    </ol>
  </div>
</template>

<script>
import notify from '@/shared/notify'

let i = 0

export default {
  name: 'Books',
  data () {
    return {
      books: null
    }
  },
  created () {
    this.$api.book.getAll().then(data => {
      this.books = data
    })
    // setTimeout(() => { this.books = [] }, 2000)
  },
  methods: {
    add () {
      this.books.push({
        id: i++,
        publishingCompany: 'tal',
        edition: 'edi',
        author: 'saw',
        title: 'titl',
        isSale: true,
        value: 200
      })
    },
    remove (id) {
      // this.books = this.books.filter(b => b.id !== id)
      this.$api.book.delete({ id }).then(res => {
        this.books = this.books.filter(b => b.id !== id)
      }).catch(err => {
        notify.error('erro')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
