import axios from "axios";
import { Task } from "@/app/user/page";

export const useEditTask = () => {
  const editTask = async (
    id: number,
    updatedData: Partial<Omit<Task, "id" | "createdAt" | "userId">>
  ) => {
    const res = await axios.patch(`/api/tasks/${id}`, updatedData);
    return res.data;
  };

  return { editTask };
};
