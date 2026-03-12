module Api
  class AuthController < ApplicationController

    def register
      render json: { message: "Register endpoint working" }
    end

    def login
    end

    def verify_otp
    end

    def resend_otp
    end

    def verify_user
    end

  end
end