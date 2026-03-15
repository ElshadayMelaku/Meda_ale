"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { successToast, errorToast } from "@/src/lib/toast";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { NewPasswordFormValues, newPasswordSchema } from "./authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function NewPasswordForm({ phone, token }: { phone: string; token: string }) {
  const router = useRouter()

  // 1. Mutation setup
  const { mutate, isPending } = useMutation({
    mutationFn: async (password: string) => {
      // In a real scenario, you'd call your service here:
      // return await updatePasswordService({ phone, token, password })
      
      // Simulating API call for structure
      console.log("Updating password for:", phone, "with token:", token);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      successToast("Password updated successfully.")
      router.push("/login")
    },
    onError: () => {
      errorToast("Failed to update password. Please try again.")
    }
  })

  // 2. Form setup with proper destructuring
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  // 3. Clean submission handler
  const onSubmit = (data: NewPasswordFormValues) => {
    mutate(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Create New Password</h2>
        <p className="text-sm text-muted-foreground">
          Your new password must be at least 6 characters.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input 
          id="password" 
          type="password" 
          {...register("password")} 
          disabled={isPending} // Disable during API call
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          type="password" 
          {...register("confirmPassword")} 
          disabled={isPending}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}