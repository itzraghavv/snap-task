"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Get started with your free account
            </p>
          </div>

          <form onSubmit={() => {}} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your username"
                required
                className="bg-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="bg-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                className="bg-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                className="bg-white/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Already have an account?
              <Link
                href="/signin"
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
