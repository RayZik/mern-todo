// @TODO duplicate of api/types/todo.ts
export interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string | Date;
}

export interface ICreateTodoDTO {
  title: string;
}