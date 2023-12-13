type TodoItemProps = {
  todo: {
    id: number;
    title: string;
  };
  onEdit: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: number
  ) => Promise<void>;
  onRemove: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: number
  ) => Promise<void>;
};
export default function TodoItem({ todo, onEdit, onRemove }: TodoItemProps) {
  return (
    <div className="todoItem">
      <div className="todoItem-title">{todo.title}</div>

      <div className="todoItem-actions">
        <a href="#" onClick={(e) => onEdit(e, todo.id)}>
          edit
        </a>{" "}
        |{" "}
        <a href="#" onClick={(e) => onRemove(e, todo.id)}>
          remove
        </a>
      </div>
    </div>
  );
}
