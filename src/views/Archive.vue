<template>
  <h1>Archived do List:</h1>
  <TodoList
    :todos="todos"
    :error="error"
    isArchived
    @delete="deleteTodoItem"
    @update="updateTodoItem"
  />
</template>
<script>
import TodoList from "../components/TodoList.vue";
import todoBase from "../mixins/todoBase";
export default {
  components: {
    TodoList,
  },
  mixins: [todoBase],
};
</script>
