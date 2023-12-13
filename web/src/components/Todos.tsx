import { useRef, useState } from "react";

import server from "../utils/trpcServer";

import { useFetchTodos } from "../hooks/useFetchTodos";

import TodoItem from "./TodoItem";
import NoTodos from "./NoTodos";
import AddTodo from "./AddTodo";
import Error from "./Error";
import Loading from "./Loading";

const Todos = () => {
  const todoInput = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | undefined>();

  const { isPending, error, data, refetch } = useFetchTodos();

  const handleSave = async () => {
    if (todoInput.current) {
      if (isEditing && currentId) {
        await server.api.update.mutate({
          id: currentId,
          title: todoInput.current.value,
        });

        setIsEditing(false);
        setCurrentId(undefined);
      } else {
        await server.api.create.mutate({
          title: todoInput.current.value,
        });
      }

      todoInput.current.value = "";
      refetch();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    todoInput.current!.value = "";
    setCurrentId(undefined);
  };

  const enableEditing = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    todoInput.current!.value = "";

    setIsEditing(true);
    setCurrentId(+id);

    const result = await server.api.get.query({ id: +id });

    todoInput.current!.value = result.todo.title;
  };

  const handleRemove = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();

    await server.api.delete.mutate({ id: +id });
    refetch();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      <h1>Todos</h1>
      {data?.todos &&
        data.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={(e) => enableEditing(e, todo.id)}
            onRemove={(e) => handleRemove(e, todo.id)}
          />
        ))}
      {data?.todos.length === 0 && <NoTodos />}
      <AddTodo
        ref={todoInput}
        handleSave={handleSave}
        handleCancel={handleCancel}
        isEditing={isEditing}
        onKeyDown={handleEnter}
      />
    </div>
  );
};

export default Todos;
