import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectTodos } from "./store/slices/todo/todo.select";
import {
  createTodoThunk,
  deleteTodoThunk,
  fetchTodoListThunk,
  toggleTodoCompletionThunk,
} from "./store/thunk/todo.thunk";

function App() {
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  useEffect(() => {
    dispatch(fetchTodoListThunk());
  }, []);

  const addTodo = useCallback((newTodo: string) => {
    dispatch(
      createTodoThunk({
        title: newTodo,
        callback: (err, data) => {
          if (err) {
            return console.error(err);
          }

          setPopupActive(false);
          setNewTodo("");
        },
      })
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch(
      deleteTodoThunk({
        id,
        callback: (err, data) => {
          if (err) {
            return console.error(err);
          }
        },
      })
    );
  }, []);

  const toggleCompletion = useCallback((id: string) => {
    dispatch(
      toggleTodoCompletionThunk({
        id,
        callback: (err, data) => {
          if (err) {
            return console.error(err);
          }
        },
      })
    );
  }, []);

  return (
    <div className="App">
      <h1>Welcome, Tyler</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={"todo" + (todo.completed ? " is-complete" : "")}
              key={todo._id}
              onClick={() => toggleCompletion(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.title}</div>

              <div
                className="delete-todo"
                onClick={(e) => {
                  e.stopPropagation();

                  deleteTodo(todo._id);
                }}
              >
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo.bind(null, newTodo)}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
