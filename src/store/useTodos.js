import { defineStore } from "pinia";
import axios from "axios";
import Todo from "../models/Todo";

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [],
    nextId: 0,
    error: "",
  }),
  actions: {
    addTodo(payload) {
      this.todos.push(payload);
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
      this.todos = this.todos.map((item) =>
        item.id === itemToArchive.id ? { ...item, isArchived: true } : item
      );
    },
    async getTodosFromAPI() {
      try {
        const response = await axios.get(
          "http://10.103.103.207:9200/data/todo/todos"
        );

        if (response.data.status) {
          this.todos = response.data.data.map((item) => new Todo(item));
        } else {
          throw response.data.errorMessage;
        }
      } catch (error) {
        this.error = error;
        return Promise.resolve();
      }
    },
  },
});
