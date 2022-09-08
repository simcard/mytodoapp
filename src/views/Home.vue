<template>
    <h1>To do List:</h1>
    <TodoList :todos="todos" :error="error" location="home" @add="newItem" @delete="deleteItem" @update="updateTodo" @archive="archiveItem"/> 
</template>

<script>
import TodoList from '../components/TodoList.vue';
import { useTodos } from "../store/useTodos";
import { mapActions, mapState, mapStores } from 'pinia';
import todoBase from '../mixins/todoBase';
export default {
  components: {
    TodoList,
  },
  mixins: [todoBase],
  data() {
    return {
      error:''
    }
  },
  async mounted() {
    const response = await this.getTodosFromAPI();
    if (!response.errorMessage) {
      this.todos = response;
    } else {
      this.error = response.errorMessage;
    }
  },
  methods: {
  ...mapActions(useTodos, ['addTodo', 'archiveTodo', 'getTodosFromAPI'],),
    newItem(payload) {
      this.todos =  this.addTodo(payload);
    },
    archiveItem(item) {
      this.todos = this.archiveTodo(item);
    }
  }
}
</script>