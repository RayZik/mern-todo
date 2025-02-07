import { ValidatorMiddleware } from '../middlewares/validator';
import { TodoModel } from '../models/Todo';
import { YupSharedTypes, Yup } from '../lib/yup';
import { ICreateTodoDTO } from '../types/todo';
import { Request, Response } from 'express';
import { NotFoundError } from '../errors';

export const getTodoListController = [
  async (req: Request, res: Response) => {
    const todos = await TodoModel.find().lean();

    res.json(todos);
  }
];

export const createTodoController = [
  ValidatorMiddleware({
    body: Yup.object({
      title: YupSharedTypes.todo.title.required()
    })
  }),
  async (req: Request<{}, {}, ICreateTodoDTO>, res: Response) => {
    const todo = new TodoModel({
      title: req.body.title
    });

    await todo.save();

    res.status(200).json(todo);
  }
];

export const updateTodoController = [
  ValidatorMiddleware({
    params: Yup.object({
      id: YupSharedTypes.id.required()
    }),
    body: Yup.object({
      title: YupSharedTypes.todo.title
    })
  }),
  async (req: Request, res: Response) => {
    const todo = await TodoModel.findOne({
      id: req.params.id
    });

    if (!todo) {
      throw new NotFoundError({
        message: 'ToDo not found'
      })
    }

    const updatedTodo = await todo.update({
      title: req.body.title
    }, {
      lean: true,
      new: true
    });

    res.status(200).json(updatedTodo);
  }
];

export const deleteTodoController = [
  ValidatorMiddleware({
    params: Yup.object({
      id: YupSharedTypes.id.required()
    }),
  }),
  async (req: Request, res: Response) => {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError({
        message: 'ToDo not found'
      })
    }

    const result = await todo.remove();

    res.json({ result });
  }
];

export const toggleCompletionTodoController = [
  ValidatorMiddleware({
    params: Yup.object({
      id: YupSharedTypes.id.required()
    }),
  }),
  async (req: Request, res: Response) => {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError({
        message: 'ToDo not found'
      })
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.status(200).json(todo);
  }
];