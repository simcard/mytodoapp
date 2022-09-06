import { uuid } from "vue-uuid";
import { defineStore } from "pinia";

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [],
    filter: "all",
    nextId: 0,
  }),
  actions: {
    addTodo(payload) {
      this.todos.push({
        value: payload.value,
        location: payload.location,
        id: uuid.v4(),
        isFinished: false,
      });
    },
    deleteTodo(itemID) {
      this.todos = this.todos.filter((object) => {
        return object.id !== itemID;
      });
    },
    updateTodoStatus(itemToUpdate) {
      let newStatus = !itemToUpdate.isFinished;
      this.todos = this.todos.map((item) =>
        item.id === itemToUpdate.id ? { ...item, isFinished: newStatus } : item
      );
    },
    archiveTodo(itemToArchive) {
      const location = "archive";
      this.todos = this.todos.map((item) =>
        item.id === itemToArchive.id ? { ...item, location: location } : item
      );
    },
  },
});
