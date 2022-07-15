import { ICreateTodoDTO } from "./store/types/todo.type";

export namespace API {
  const API_BASE = 'http://mern-elb-1132660749.us-east-1.elb.amazonaws.com/api';

  const prepareUrl = (url: string) => `${API_BASE}${url}`;

  const get = async (url: string) => {
    const response = await fetch(prepareUrl(url));

    return await response.json();
  }

  const remove = async (url: string) => {
    const response = await fetch(prepareUrl(url), {
      method: 'DELETE',
    });

    return await response.json();
  }

  const put = async <T = any>(url: string, data?: T) => {
    const response = await fetch(prepareUrl(url), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  const post = async <T = any>(url: string, data: T) => {
    const response = await fetch(prepareUrl(url), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  export namespace Todo {
    export function getList() {
      return get("/todos");
    }

    export function create(data: ICreateTodoDTO) {
      return post("/todos", data);
    }

    export function removeById(id: string) {
      return remove(`/todos/${id}`);
    }

    export function toggleCompletion(id: string) {
      return put(`/todos/${id}/toggle-completion`);
    }
  }
}