<template>
  <div class="modal-component-container">
    <h1>Livros à venda</h1>

    <form @submit="add">
      <Modal
        id="add-book"
        :open-button="true"
        open-button-title="+"
        open-button-class="btn btn-primary"
        title="Adicionar livro"
        ref="addBookModal">
        <div slot="body">

            <input
              type="text"
              class="form-control"
              placeholder="Editora"
              v-model="newBook.publishingCompany">

            <input
              type="text"
              class="form-control"
              placeholder="Edição"
              v-model="newBook.edition">

            <input
              type="text"
              class="form-control"
              placeholder="Autor"
              v-model="newBook.author">

            <input
              type="text"
              class="form-control"
              placeholder="Título"
              v-model="newBook.title">

            <label for="is-sale">À venda</label>
            <input
              type="checkbox"
              class="form-control"
              id="is-sale"
              v-model="newBook.isSale">

            <input
              type="number"
              class="form-control"
              placeholder="Valor"
              v-model.number="newBook.value">
        </div>
        <button slot="footer" class="btn btn-primary">Salvar</button>
      </Modal>
    </form>

    <ol>
      <li
        v-for="book in books"
        :key="book.id"
        v-show="books && books.length">
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
        v-show="!books">
          carregando...
      </li>
      <li
        v-show="books && !books.length">
          Nenhum livro à venda
        </li>
    </ol>

  </div>
</template>

<script>
import Modal from '../shared/Modal'

export default {
  name: 'Books',
  data () {
    return {
      books: null,
      newBook: { isSale: true }
    }
  },
  created () {
    this.$api.book.getAll()
      .then(data => {
        this.books = data
      })
  },
  methods: {
    add () {
      this.$api.book.add(this.newBook)
        .then(data => {
          this.books.push(data)
          this.$refs.addBookModal.hide()
          this.newBook = { isSale: true }
        })
    },
    remove (id) {
      this.$api.book.delete({ id })
        .then(res => {
          this.books = this.books.filter(b => b.id !== id)
        })
    }
  },
  components: {
    Modal
  },
  beforeRouteLeave (to, from, next) {
    if (this.books === null) { // loading
      this.$api.cancel.book.getAll()
    }
    next()
  }
}
</script>

<style scoped>
</style>
