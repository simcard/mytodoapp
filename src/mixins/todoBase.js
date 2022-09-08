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
      "updateTodoStatus",
      "getTodosFromAPI",
    ]),
    deleteItem(itemID) {
      this.todos = this.deleteTodo(itemID);
    },
    updateTodo(item) {
      this.todos = this.updateTodoStatus(item);
    },
  },
};
