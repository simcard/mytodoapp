<template>
    <h1>Archived do List:</h1>
    <TodoList location="archive" />
</template>
<script>
import TodoList from '../components/TodoList.vue';

export default { 
    name: "archive",
    components: {
        TodoList
    }
}
</script>
