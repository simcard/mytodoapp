import { uuid } from "vue-uuid";
import { defineStore } from "pinia";
import axios from "axios";
import Todo from "../models/Todo";

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: [],
    filter: "all",
    nextId: 0,
    error:''
  }),
  actions: {
    addTodo(payload) {
      const todo = new Todo(payload);
      todo.id = uuid.v4();
      this.todos.push(todo);
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
    getTodosFromAPI() {
      axios
        .get("http://10.103.103.195:9200/data/mytodoapp/todos")
        .then(response => {
          if(response.data.status){
            this.todos  = response.data.data.map(item => new Todo(item));
          }
          else {
            this.error = response.data.errorMessage;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
