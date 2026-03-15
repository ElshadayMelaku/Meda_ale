"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { phoneSchema, PhoneFormValues } from "./authSchema"
import { successToast,errorToast} from "@/src/lib/toast" // Assuming your toast hook location
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import toast from "@/src/lib/toast"

export function PhoneEntryForm({ onNext }: { onNext: (phone: string) => void }) {
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (phone: string) => {
      // Replace with your actual Rails service call
      // const res = await fetch("/api/proxy/password-reset/initiate", {
      //   method: "POST",
      //   body: JSON.stringify({ phone_number: phone }),
      // })
      // if (!res.ok) throw new Error("User not found")
      // return res.json()
      // Mocking the API response delay
      return new Promise<string>((resolve) => {
        setTimeout(() => resolve(phone), 1000);
      });
    },
    onSuccess: (_, phone) => {
      successToast("OTP Sent: Please check your messages.")
      onNext(phone)
    },
    onError: (error: Error) => {
      errorToast(
       "Failed to send OTP. Please try again."
      )
    }
  })

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
  })

  return (
    <form onSubmit={form.handleSubmit((data:any) => mutate(data.phone))} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Forgot Password?</h2>
        <p className="text-sm text-muted-foreground">Enter your phone number to reset.</p>
      </div>
      <Input {...form.register("phone")} placeholder="0911..." disabled={isPending} />
      <Button className="w-full" disabled={isPending}>
        {isPending ? "Sending SMS..." : "Continue"}
      </Button>
    </form>
  )
}