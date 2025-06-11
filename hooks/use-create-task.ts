import { Task } from "@/app/user/page";
import axios from "axios";

export const useCreateTask = () => {
  const createTask = async (task: Omit<Task, "id" | "createdAt">) => {
    const res = await axios.post("/api/tasks/create", task);
    return res.data;
  };

  return { createTask };
};
