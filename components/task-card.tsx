import { Task } from "@/app/user/page";
import { cn } from "@/lib/utils";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (task: Task) => void;
  animationDelay?: number;
}

export const TaskCard = ({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  animationDelay = 0,
}: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "LOW":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && !task.completed;
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in",
        task.completed && "bg-gray-50 opacity-75",
        isOverdue() && "border-red-200 bg-red-50"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="w-5 h-5"
          />
        </div>

        {/* Task Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className={cn(
                "text-lg font-semibold leading-tight",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>

            {/* Priority Badge */}
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0",
                getPriorityColor(task.priority)
              )}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>

          {task.description && (
            <p
              className={cn(
                "text-muted-foreground mb-4 leading-relaxed",
                task.completed && "line-through"
              )}
            >
              {task.description}
            </p>
          )}

          {/* Due Date */}
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span
              className={cn(
                "text-sm",
                isOverdue()
                  ? "text-red-600 font-medium"
                  : "text-muted-foreground",
                task.completed && "line-through"
              )}
            >
              Due: {formatDate(task.dueDate)}
              {isOverdue() && (
                <span className="ml-2 text-red-600 font-medium">(Overdue)</span>
              )}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditTask(task)}
              className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteTask(task.id)}
              className="hover:bg-red-50 hover:border-red-200 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
