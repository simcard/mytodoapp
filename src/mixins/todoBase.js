import { useTodos } from "../store/useTodos";
import { mapActions, mapState, mapStores } from "pinia";
export default {
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    ...mapActions(useTodos, ["deleteTodo", "updateTodoStatus"]),
    deleteItem(itemID) {
      this.todos = this.deleteTodo(itemID);
    },
    updateTodo(item) {
      this.todos = this.updateTodoStatus(item);
    },
  },
};
