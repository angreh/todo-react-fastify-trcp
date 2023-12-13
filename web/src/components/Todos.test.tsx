// Imports
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Todos from "./Todos";

const { mockedFetchTodos } = vi.hoisted(() => {
  return {
    mockedFetchTodos: vi.fn(),
  };
});

vi.mock("../hooks/useFetchTodos", () => ({
  useFetchTodos: mockedFetchTodos,
}));

// Tests
describe("components/Todos", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Test when everything is fine", async () => {
    mockedFetchTodos.mockReturnValueOnce({
      isPending: false,
      error: null,
      data: {
        todos: [{ id: 1, title: "Test" }],
      },
    });

    await render(<Todos />);

    const title = await screen.getByText("Todos");

    expect(title).not.toBeNull();
    expect(true).toBe(true);
  });

  it("Test during loading", async () => {
    mockedFetchTodos.mockReturnValueOnce({
      isPending: true,
      error: null,
      data: {},
    });

    await render(<Todos />);

    const loading = await screen.getByText("Loading...");

    expect(loading).not.toBeNull();
    expect(true).toBe(true);
  });

  it("Test when there is an error", async () => {
    mockedFetchTodos.mockReturnValueOnce({
      isPending: false,
      error: { message: "#Fail" },
      data: {},
    });

    await render(<Todos />);

    const error = await screen.getByText("Error: #Fail");

    expect(error).not.toBeNull();
    expect(true).toBe(true);
  });

  it("Test when there is no data", async () => {
    mockedFetchTodos.mockReturnValueOnce({
      isPending: false,
      error: null,
      data: { todos: [] },
    });

    await render(<Todos />);

    const noData = await screen.getByText("No todos");

    expect(noData).not.toBeNull();
    expect(true).toBe(true);
  });

  it("Test when cancel button is clicked", async () => {
    mockedFetchTodos.mockReturnValueOnce({
      isPending: false,
      error: null,
      data: {
        todos: [{ id: 1, title: "Test" }],
      },
    });

    await render(<Todos />);

    const cancelButtons = await screen.getAllByText("cancel");
    const input = (await screen.getAllByTestId(
      "tInput"
    )[0]) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });

    expect(input.value).toBe("new value");
    fireEvent.click(cancelButtons[0]);
    expect(input.value).toBe("");
  });

  it("Test when key escape is pressed", async () => {
    mockedFetchTodos.mockReturnValueOnce({
      isPending: false,
      error: null,
      data: {
        todos: [{ id: 1, title: "Test" }],
      },
    });

    await render(<Todos />);

    const input = (await screen.getAllByTestId(
      "tInput"
    )[0]) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "new value" } });
    expect(input.value).toBe("new value");

    fireEvent.keyUp(input, { key: "Escape", keyCode: 27 });
    expect(input.value).toBe("");
  });
});
