"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/task-modal";
import { TaskList } from "@/components/task-list";
import { Stats } from "@/components/stats";

import { useGetTasks } from "@/hooks/use-get-tasks";
import { useCreateTask } from "@/hooks/use-create-task";
import { useDeleteTask } from "@/hooks/use-delete-task";
import { useEditTask } from "@/hooks/use-edit-task";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export default function Index() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { tasks, loading, setTasks } = useGetTasks();

  const { createTask } = useCreateTask();
  const { deleteTask } = useDeleteTask();
  const { editTask } = useEditTask();

  const handleCreateTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = await createTask({
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
    });
    setTasks([newTask, ...tasks]);
    setIsFormOpen(false);
    toast.success("Task Added!");
  };

  const handleUpdateTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return;

    try {
      const updated = await editTask(editingTask.id, taskData);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...updated } : task
        )
      );

      setEditingTask(null);
      setIsFormOpen(false);
    } catch (err) {
      toast.error("Failed to update task.");
      console.error("Failed to update task", err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      toast.error("Failed to delete task.");
      console.log("Failed to Delete", err);
    }
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Snap Task
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        <Stats tasks={tasks} />

        <div className="flex justify-center mb-8">
          <Button
            onClick={openCreateForm}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Task
          </Button>
        </div>

        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          loading={loading}
        />

        {isFormOpen && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onClose={closeForm}
          />
        )}
      </div>
    </div>
  );
}
