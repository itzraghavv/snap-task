import { Task } from "@/app/user/page";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/tasks", {
        withCredentials: true,
      });

      console.log(res.data);
      setTasks(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
        setError(err.message || "Axios error while retrieving tasks");
      } else {
        console.log(err);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return { tasks, loading, error, setTasks, fetchTask };
};
