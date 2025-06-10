import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <CheckCircle className="size-6" />,
      title: "Easy Task Management",
      description:
        "Create, organize, and track your tasks with intuitive interface",
    },
    {
      icon: <Star className="size-6" />,
      title: "Priority System",
      description: "Set priorities and never miss important deadlines",
    },
    {
      icon: <Users className="size-6" />,
      title: "Personal Dashboard",
      description:
        "Get insights into your productivity with detailed statistics",
    },
    {
      icon: <Zap className="size-6" />,
      title: "Fast & Responsive",
      description: "Built for speed with modern web technologies",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TaskManager
          </div>
          <div className="space-x-4">
            <Link href="/signin">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Organize Your Life
          </span>
          <br />
          <span className="text-foreground">One Task at a Time</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stay productive and organized with our intuitive task management
          system. Track your progress, set priorities, and achieve your goals.
        </p>
        <div className="space-x-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg"
            >
              Start Free Today
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to stay organized
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have transformed their workflow
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground border-t border-border">
        <p>&copy; 2024 TaskManager. Built with ❤️ using Lovable.</p>
      </footer>
    </div>
  );
}
