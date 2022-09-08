<template>
    <h1>To do List:</h1>
    <TodoList :todos="todos" :error="error"  @add="newItem" @delete="deleteItem" @update="updateTodo" @archive="archiveItem"/> 
</template>

<script>
import TodoList from '../components/TodoList.vue';
import { useTodos } from "../store/useTodos";
import { mapActions, mapState } from 'pinia';
import todoBase from '../mixins/todoBase';
export default {
  components: {
    TodoList,
  },
  mixins: [todoBase],
  methods: {
  ...mapActions(useTodos, ['addTodo', 'archiveTodo'],),
    newItem(payload) {
      this.addTodo(payload);
    },
    archiveItem(item) {
      this.archiveTodo(item);
    }
  }
}
</script>