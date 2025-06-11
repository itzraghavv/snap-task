import { Task } from "@/app/user/page";

interface StatsProps {
  tasks: Task[];
}

export const Stats = ({ tasks }: StatsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const statCards = [
    {
      label: "Total Tasks",
      value: totalTasks,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      label: "Completed",
      value: completedTasks,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      label: "Pending",
      value: pendingTasks,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={stat.label}
          className={`${stat.bgColor} rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
