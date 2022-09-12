<template>
  <div id="todo-list">
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
    <div v-else>
      <div v-if="!isArchived" id="new-todo-list-item">
        <input type="text" id="new-todo-list-item-input" v-model="todo.value" />
        <input
          type="submit"
          id="new-todo-list-item-submit"
          @click="newItem"
          value="Add To Do List Item"
        />
      </div>
      <div class="list-item" v-for="n in todos" :key="n.id">
        <div
          class="list-item-holder"
          v-if="n.isArchived == isArchived"
          :data-status="n.isFinished"
        >
          <input
            type="checkbox"
            :id="n.id"
            @click="updateTodo(n)"
            :checked="n.isFinished"
          />
          <label>{{ n.value }}</label>
          <div class="delete-item" @click="deleteItem(n.id)">Delete</div>
          <div
            class="archive-item"
            v-if="!n.isArchived"
            @click="archiveItem(n)"
          >
            Archive
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Todo from "../models/Todo";
import { uuid } from "vue-uuid";

export default {
  props: {
    isArchived: {
      type: Boolean,
      default: false,
    },
    todos: {
      type: Array,
      default: () => [],
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      todo: new Todo(),
    };
  },
  methods: {
    updateTodo(item) {
      this.$emit("update", item);
    },
    deleteItem(itemID) {
      this.$emit("delete", itemID);
    },
    newItem() {
      if (this.todo.value !== "") {
        this.todo.id = uuid.v4();
        this.$emit("add", this.todo);
        console.log(this.todo);
        this.todo = new Todo();
      }
    },
    archiveItem(item) {
      this.$emit("archive", item);
    },
  },
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
.item-options,
.item-checkbox {
  display: flex;
}
#new-todo-list-item {
  padding: 1rem;
}
#new-todo-list-item input[type="text"] {
  margin: 0 0 1rem 0;
}
.delete-item,
.archive-item {
  font-size: 0.875rem;
  background: #eee;
  margin: 0 0 0 0.5rem;
  height: 1rem;
  border-radius: 100px;
  transition: all 0.1s ease-out;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  padding: 0.25rem 0.75rem;
}
.checkbox-items {
  display: flex;
  align-items: center;
}
.delete-item:hover,
.archive-item:hover {
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
.error {
  color: red;
  padding: 10px;
}
</style>
