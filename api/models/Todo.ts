import mongoose from 'mongoose';
import { ITodo } from '../types/todo';


const Schema = mongoose.Schema;

const TodoSchema = new Schema<ITodo>({
	title: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: String,
		default: Date.now()
	}
});

export const TodoModel = mongoose.model<ITodo>("Todo", TodoSchema);
