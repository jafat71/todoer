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
import { useState } from "react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetSchema = z.object({
  code: z.string().min(6, "El código debe tener 6 dígitos").max(6, "El código debe tener 6 dígitos"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const EmailStep = ({ onSubmit, isLoading, onGoToVerification, onBackToLogin }) => {
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const handleEmailSubmit = async (data) => {
    try {
      await onSubmit({ ...data, step: "email" });
      onGoToVerification();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...emailForm}>
      <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6 flex flex-col justify-between min-h-[420px]">
        <div className="space-y-4">
          <p className="text-slate-400 text-sm w-full font-thin">
            Enter your email address and we&apos;ll send you a code to reset your password.
          </p>
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-light">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input {...field} type="email" placeholder="email@example.com" className="pl-10 bg-black/20 border-f2green text-white" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            className="w-full text-slate-400 hover:text-f2green hover:bg-voidBlack/50 text-sm"
            onClick={onGoToVerification}
          >
            I already have a code
          </Button>
        </div>
        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full bg-f2green hover:bg-fgreen text-black font-medium py-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Send Reset Code"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-slate-400 hover:text-f2green hover:bg-voidBlack/50"
            onClick={onBackToLogin}
          >
            Back to Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
};

const VerificationStep = ({ onSubmit, isLoading, onGoToEmail }) => {
  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { code: "", password: "" },
  });

  return (
    <Form {...resetForm}>
      <form onSubmit={resetForm.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-between min-h-[420px]">
        <div className="space-y-4">
          <p className="text-slate-400 text-sm w-full font-thin">
            Enter the code we sent to your email.Check your spam folder if you don&apos;t see it.
          </p>
          <FormField
            control={resetForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-light">Reset Code</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Enter your code" className="w-full bg-black/20 border-f2green text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={resetForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-light">New Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full bg-f2green hover:bg-fgreen text-black font-medium py-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Reset Password"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-slate-400 hover:text-f2green hover:bg-voidBlack/50"
            onClick={onGoToEmail}
          >
            Back to Email Step
          </Button>
        </div>
      </form>
    </Form>
  );
};

const ResetPasswordForm = ({ onSubmit, isLoading, onBackToLogin }) => {
  const [resetStep, setResetStep] = useState("email");

  return resetStep === "email" ? (
    <EmailStep
      onSubmit={onSubmit}
      isLoading={isLoading}
      onGoToVerification={() => setResetStep("verification")}
      onBackToLogin={onBackToLogin}
    />
  ) : (
    <VerificationStep
      onSubmit={onSubmit}
      isLoading={isLoading}
      onGoToEmail={() => setResetStep("email")}
    />
  );
};

export default ResetPasswordForm;
