import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      // console.log(data);
      return data;
    },
  });
  return { isPending, isError, data };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, {
        isDone,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(`Task: ${item.title} edited`);
    },
  });
  return { editTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading: deleteTaskIsLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task removed");
    },
  });
  return { deleteTask, deleteTaskIsLoading };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading: createTaskIsLoading } = useMutation({
    mutationFn: (newTask) => {
      return customFetch.post("/", { title: newTask });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task added");
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, createTaskIsLoading };
  // console.log(result); // Will come back as undefined
};
