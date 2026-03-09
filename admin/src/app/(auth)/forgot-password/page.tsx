import React from 'react'
import { ResetPasswordWizard } from '@/src/components/auth/ForgotPassword'
const ForgotPassword = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <ResetPasswordWizard />
    </div>
  )
}

export default ForgotPassword