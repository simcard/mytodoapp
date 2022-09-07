<template>
    <div id="todo-list">
        <div v-if="error">
            {{error}}
        </div>
        <div v-else>
           <div id="new-todo-list-item">
            <input type="text" id="new-todo-list-item-input" v-model="newTodoItem"/>
            <input type="submit" id="new-todo-list-item-submit" @click="newItem" value="Add To Do List Item">
        </div>
        <div class="list-item" v-for="n in todos" :key="n.id">
            <div class="list-item-holder" v-if="n.location == location" :data-status="n.isFinished">
                <input type="checkbox"  :id="n.id" @click="updateTodo(n)" :checked="n.isFinished"> 
                <label>{{n.value}}</label>
                <div class="delete-item" @click="deleteItem(n.id)">Delete</div>
                <div class="archive-item" v-if="n.location !== 'archive'" @click="archiveItem(n)">Archive</div>
            </div>
        </div>        
     </div>      
    </div>
</template>
<script>
import { useTodos } from "../store/useTodos";
import { mapActions, mapState, mapStores } from 'pinia';
export default {
    props: {
        location: String
    },
    data() {
        return {
            newTodoItem: '',
        }
    },
    mounted(){
        this.getTodosFromAPI();
    },
    computed: {
        ...mapStores(useTodos),
        ...mapState(useTodos, ['todos', 'error'])
    },
    methods: {
        ...mapActions(useTodos, ['addTodo', 'deleteTodo', 'updateTodoStatus', 'archiveTodo', 'getTodosFromAPI'],),
        updateTodo(item) {
            this.updateTodoStatus(item)
        },
        deleteItem(itemID) {
            this.deleteTodo(itemID)
        },
        newItem() {
            if (this.newTodoItem !== '') {
                const payload = {
                    value: this.newTodoItem,
                    location: this.location
                }
                this.addTodo(payload);
                console.log(this.todos);
            }
        },
        archiveItem(item) {
            this.archiveTodo(item);
        }
    }

};
</script>
<style scoped>
#todo-list {
    border-radius: 14px;
    max-width: 700px;
    border: 2px solid #ddd;
}
.list-item-holder {
    display: flex;
    padding: 1rem 1rem;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
}
.item-options, .item-checkbox  {
    display: flex;
}
#new-todo-list-item {
    padding: 1rem;
}
#new-todo-list-item input[type="text"] {
    margin: 0 0 1rem 0;
}
.delete-item, .archive-item {
    font-size: 0.875rem;
    background: #eee;
    margin: 0 0 0 0.5rem;
    height: 1rem;
    border-radius: 100px;
    transition: all 0.1s ease-out;
    color: rgba(0,0,0,0.5);
    cursor: pointer;
    padding: 0.25rem 0.75rem;
}
.checkbox-items {
    display: flex;
    align-items: center;
}
.delete-item:hover, .archive-item:hover {
    background: #ddd;
    color: black;
}
[data-status="false"] label {
    color: #e65300;
    font-weight: 600;
}
[data-status="true"] label {
    text-decoration: line-through;
}
</style>