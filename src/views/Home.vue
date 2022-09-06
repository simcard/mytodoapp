<template>
    <h1>To do List:</h1>
    <TodoList location="home" /> 
</template>

<script>
import TodoList from '../components/TodoList.vue';


export default { 
    components: {
        TodoList,
    }
}
</script>