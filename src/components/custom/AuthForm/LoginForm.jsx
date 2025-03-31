/* eslint-disable react/prop-types */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/PasswordInput";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = ({ onSubmit, isLoading, onRegisterClick, onResetClick }) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col min-h-[320px]">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input {...field} type="email" placeholder="email@example.com" 
                      className="pl-10 bg-black/20 border-slate-700 text-white" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <PasswordInput field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3 mt-auto">
          <Button
            type="submit"
            className="w-full bg-f2green hover:bg-fgreen text-black font-medium py-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Sign In"}
          </Button>

          <div className="space-y-2">
            <Button
              type="button"
              variant="ghost"
              className="w-full text-slate-400 hover:text-f2green hover:bg-slate-800/50"
              onClick={onRegisterClick}
            >
              Don&apos;t have an account? Sign Up
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-slate-400 hover:text-f2green hover:bg-slate-800/50"
              onClick={onResetClick}
            >
              Forgot your password?
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm; 