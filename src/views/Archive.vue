<template>
    <h1>Archived do List:</h1>
     <TodoList :todos="todos" :error="error" isArchived  @delete="deleteItem" @update="updateTodo"/> 
</template>
<script>
import TodoList from '../components/TodoList.vue';
import todoBase from '../mixins/todoBase';
export default { 
    name: "archive",
    components: {
        TodoList
    },
    mixins: [todoBase]
}
</script>
