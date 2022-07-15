import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

test("Check right render", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const app = screen.getByText(/Your tasks/i);
  expect(app).toBeInTheDocument();
});
