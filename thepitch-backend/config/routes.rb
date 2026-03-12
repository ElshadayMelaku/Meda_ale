Rails.application.routes.draw do

  namespace :api do
    post "register", to: "auth#register"
    post "login", to: "auth#login"
    post "verify-otp", to: "auth#verify_otp"
    post "resend-otp", to: "auth#resend_otp"
    post "verify-user", to: "auth#verify_user"

    post "send-message", to: "sms#send_message"
  end

end