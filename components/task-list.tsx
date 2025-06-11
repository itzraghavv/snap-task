import { Task } from "@/app/user/page";
import { TaskCard } from "./task-card";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export const TaskList = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}: TaskListProps) => {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
        </div>
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          No tasks yet
        </h3>
        <p className="text-muted-foreground">
          Create your first task to get started with your productivity journey!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Pending Tasks ({pendingTasks.length})
          </h2>
          <div className="space-y-4">
            {pendingTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                animationDelay={index * 50}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="space-y-4">
            {completedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                animationDelay={index * 50}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
