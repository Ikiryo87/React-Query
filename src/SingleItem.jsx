import { useEditTask, useDeleteTask } from "./reactQueryCustomHooks";

const SingleItem = ({ item }) => {
  const { deleteTask, deleteTaskIsLoading } = useDeleteTask();
  const { editTask } = useEditTask();

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone })}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deleteTask(item.id)}
        disabled={deleteTaskIsLoading}
      >
        delete
      </button>
    </div>
  );
};

export default SingleItem;
