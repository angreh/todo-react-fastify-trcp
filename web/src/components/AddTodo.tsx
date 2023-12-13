import { ComponentPropsWithoutRef, forwardRef } from "react";

type TodoItemProps = {
  handleSave: () => void;
  handleCancel: () => void;
  isEditing: boolean;
} & ComponentPropsWithoutRef<"input">;
const AddTodo = forwardRef<HTMLInputElement, TodoItemProps>(
  (
    { handleSave, handleCancel, isEditing, ...props },
    ref
  ) => {
    return (
      <div>
        <input
          type="text"
          data-testid="tInput"
          {...props}
          ref={ref}
        />
        <button onClick={handleSave}>{isEditing ? "save" : "new"}</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
    );
  }
);

export default AddTodo;
