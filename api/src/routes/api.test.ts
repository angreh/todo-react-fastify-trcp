import { describe, it, expect } from "vitest";
import { inferProcedureInput } from "@trpc/server";

import { appRouter, AppRouter } from "./index";
const caller = appRouter.createCaller({});

describe("API:getAll", async () => {
  it("should return hello", async () => {
    let input: inferProcedureInput<AppRouter["api"]["hello"]> = {
      name: "Angreh",
    };
    const result = await caller.api.hello(input);

    expect(result.text).not.toBeNull();
    expect(result.text).toEqual("Hello Angreh!");
  });

  it("should return hello world", async () => {
    let input: inferProcedureInput<AppRouter["api"]["hello"]> = null;
    const result = await caller.api.hello(input);

    expect(result.text).not.toBeNull();
    expect(result.text).toEqual("Hello world!");
  });

  it("should return all todos", async () => {
    const result = await caller.api.getAll();

    expect(result.todos.length).toBeGreaterThan(0);
  });

  it("should return one todo", async () => {
    const input: inferProcedureInput<AppRouter["api"]["get"]> = {
      id: 11,
    };
    const result = await caller.api.get(input);

    expect(result.todo.title).toEqual("Opa");
  });

  it("should create one todo", async () => {
    const input: inferProcedureInput<AppRouter["api"]["create"]> = {
      title: "new todo",
    };
    const result = await caller.api.create(input);

    expect(result.success).toEqual(true);
  });

  it("should edit one todo", async () => {
    const getAllInput: inferProcedureInput<AppRouter["api"]["getAll"]> =
      null as any;
    const todosResult = await caller.api.getAll(getAllInput);

    const updateInput: inferProcedureInput<AppRouter["api"]["update"]> = {
      id: todosResult.todos[todosResult.todos.length - 1].id,
      title: "edited todo",
    };
    const updateResult = await caller.api.update(updateInput);

    expect(updateResult.success).toEqual(true);
  });

  it("should remove one todo", async () => {
    const todosInput: inferProcedureInput<AppRouter["api"]["getAll"]> =
      null as any;
    const todosResult = await caller.api.getAll(todosInput);

    const deleteInput: inferProcedureInput<AppRouter["api"]["delete"]> = {
      id: todosResult.todos[todosResult.todos.length - 1].id,
    };
    const deleteResult = await caller.api.delete(deleteInput);

    expect(deleteResult.success).toEqual(true);
  });
});
