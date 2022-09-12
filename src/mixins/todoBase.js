import { useTodos } from "../store/useTodos";
import { mapActions, mapState } from "pinia";
export default {
  async mounted() {
    //await this.getTodosFromAPI();
  },
  computed: {
    ...mapState(useTodos, ["todos", "error"]),
  },
  methods: {
    ...mapActions(useTodos, [
      "deleteTodo",
      "updateTodoItemStatus",
      "getTodosFromAPI",
    ]),
    deleteTodoItem(itemID) {
      this.todos = this.deleteTodo(itemID);
    },
    updateTodoItem(item) {
      this.todos = this.updateTodoItemStatus(item);
    },
  },
};
