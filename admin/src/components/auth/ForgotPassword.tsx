"use client"

import { useState } from "react"
import { PhoneEntryForm } from "./Phone-entry-form"
import { OtpVerifyForm } from "./Otp-verify-form"
import { NewPasswordForm } from "./New-password-form"
import { Card, CardContent } from "@/src/components/ui/card"

export function ResetPasswordWizard() {
  const [step, setStep] = useState<'PHONE' | 'OTP' | 'PASSWORD'>('PHONE')
  const [phone, setPhone] = useState("")
  const [token, setToken] = useState("")

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-lg">
      <CardContent className="pt-6">
        {step === 'PHONE' && (
          <PhoneEntryForm 
            onNext={(p) => { setPhone(p); setStep('OTP'); }} 
          />
        )}
        {step === 'OTP' && (
          <OtpVerifyForm 
            phone={phone} 
            onVerified={(t) => { setToken(t); setStep('PASSWORD'); }} 
            onBack={() => setStep('PHONE')}
          />
        )}
        {step === 'PASSWORD' && (
          <NewPasswordForm phone={phone} token={token} />
        )}
      </CardContent>
    </Card>
  )
}