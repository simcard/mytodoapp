import { uuid } from "vue-uuid";
import { defineStore } from "pinia";
import axios from "axios";
import Todo from "../models/Todo";

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [],
    filter: "all",
    nextId: 0,
    error: "",
  }),
  actions: {
    addTodo(payload) {
      const todo = new Todo(payload);
      todo.id = uuid.v4();
      this.todos.push(todo);
      return this.todos;
    },
    deleteTodo(itemID) {
      this.todos = this.todos.filter((object) => {
        return object.id !== itemID;
      });
      return this.todos;
    },
    updateTodoStatus(itemToUpdate) {
      let newStatus = !itemToUpdate.isFinished;
      this.todos = this.todos.map((item) =>
        item.id === itemToUpdate.id ? { ...item, isFinished: newStatus } : item
      );
      return this.todos;
    },
    archiveTodo(itemToArchive) {
      const location = "archive";
      this.todos = this.todos.map((item) =>
        item.id === itemToArchive.id ? { ...item, location: location } : item
      );
      return this.todos;
    },
    async getTodosFromAPI() {
      try {
        const response = await axios.get(
          "http://192.168.1.102:9200/data/mytodoapp/todos"
        );
        if (response.data.status) {
          this.todos = response.data.data.map((item) => new Todo(item));
          return this.todos;
        } else {
          throw response.data.errorMessage;
        }
      } catch (error) {
        console.log(error);
        return Promise.resolve({ errorMessage: error });
      }
    },
  },
});
