import { uuid } from "vue-uuid";

export default class Todo {
  constructor(existingObject) {
    const object = existingObject || {};

    this.id = object.id || undefined;
    this.value = object.value || undefined;
    this.isArchived = object.isArchived || false;
    this.isFinished = object.isFinished || false;
  }
}
