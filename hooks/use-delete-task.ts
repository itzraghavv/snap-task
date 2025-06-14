import axios from "axios";

export const useDeleteTask = () => {
  const deleteTask = async (id: number) => {
    const res = await axios.delete(`/api/tasks/${id}`);
    return res.data;
  };

  return { deleteTask };
};
