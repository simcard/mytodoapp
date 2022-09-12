<template>
  <h1>To do List:</h1>
  <TodoList
    :todos="todos"
    :error="error"
    @add="addNewITodotem"
    @delete="deleteTodoItem"
    @update="updateTodoItem"
    @archive="archiveTodoItem"
  />
</template>

<script>
import TodoList from "../components/TodoList.vue";
import { useTodos } from "../store/useTodos";
import { mapActions, mapState } from "pinia";
import todoBase from "../mixins/todoBase";
export default {
  components: {
    TodoList,
  },
  mixins: [todoBase],
  methods: {
    ...mapActions(useTodos, ["addTodo", "archiveTodo"]),
    addNewITodotem(payload) {
      this.addTodo(payload);
    },
    archiveTodoItem(item) {
      this.archiveTodo(item);
    },
  },
};
</script>
