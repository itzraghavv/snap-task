import { Task } from "@/app/user/page";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useGetTasks = () => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!session) {
    setError("Not authenticated");
    return;
  }

  const fetchTask = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/tasks", {
        withCredentials: true,
      });

      console.log(res.data);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed to retrieve tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchTasks();
    if (status === "unauthenticated") {
      setLoading(false);
      setError("Not authenticated");
    }
  }, [status]);

  return { tasks, loading, error, setTasks, fetchTask };
};
