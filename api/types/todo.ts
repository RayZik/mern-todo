// @TODO duplicate of client/store/types/todo.type.ts
export interface ITodo {
  title: string;
  completed: boolean;
  createdAt: string | Date;
}

export interface ICreateTodoDTO {
  title: string;
}