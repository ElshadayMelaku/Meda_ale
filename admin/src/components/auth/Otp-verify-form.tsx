"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { successToast, errorToast } from "@/src/lib/toast";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { otpSchema, OtpFormValues } from "./authSchema";

interface OtpVerifyFormProps {
  phone: string;
  onVerified: (resetToken: string) => void;
  onBack: () => void;
}

export function OtpVerifyForm({ phone, onVerified, onBack }: OtpVerifyFormProps) {
  // 1. Mutation for OTP Verification
  const { mutate, isPending } = useMutation({
    mutationFn: async (otp: string) => {
      // In production, call your Rails service:
      // const res = await verifyOtpService({ phone, otp });
      // return res.reset_token;

      // Mocking the Rails API response delay
      return new Promise<string>((resolve) => {
        setTimeout(() => resolve("temp_secure_token_123"), 1000);
      });
    },
    onSuccess: (resetToken) => {
      successToast("Code verified successfully.");
      onVerified(resetToken);
    },
    onError: () => {
      errorToast("Invalid or expired code. Please try again.");
    },
  });

  // 2. Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: OtpFormValues) => {
    mutate(data.otp);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Verify Code</h2>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to <span className="font-medium text-foreground">{phone}</span>.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp">6-Digit Code</Label>
        <Input
          id="otp"
          type="text"
          maxLength={6}
          placeholder="123456"
          className="tracking-widest text-center text-lg"
          {...register("otp")}
          disabled={isPending}
        />
        {errors.otp && (
          <p className="text-sm text-red-500 font-medium">{errors.otp.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isPending}
          className="w-1/3"
        >
          Back
        </Button>
        <Button type="submit" className="w-2/3" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify Code"}
        </Button>
      </div>
    </form>
  );
}