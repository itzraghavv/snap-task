"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/task-modal";
import { TaskList } from "@/components/task-list";
import { Stats } from "@/components/stats";
import { useGetTasks } from "@/hooks/use-get-tasks";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export default function Index() {
  const { tasks, loading, error, setTasks } = useGetTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks([newTask, ...tasks]);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        )
      );
      setEditingTask(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: string) => {
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Snap Task
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        {/* Stats */}
        <Stats tasks={tasks} />

        {/* Add Task Button */}
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

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />

        {/* Task Form Modal */}
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
