module Api
  class AuthController < ApplicationController
    # Skip CSRF verification if it's an API. Although Rails 8 API-only apps do this automatically.
    # skip_before_action :verify_authenticity_token, raise: false
    
    def register
      user = User.new(user_params)
      
      if user.save
        token = JsonWebToken.encode(user_id: user.id)
        render json: { 
          message: "User created successfully", 
          token: token,
          user: { id: user.id, name: user.name, email: user.email }
        }, status: :created
      else
        render json: { 
          error: user.errors.full_messages.join(', ') 
        }, status: :unprocessable_entity
      end
    end

    def login
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        render json: { 
          token: token,
          user: { id: user.id, name: user.name, email: user.email }
        }, status: :ok
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end

    def verify_otp
      render json: { message: "Not implemented yet" }
    end

    def resend_otp
      render json: { message: "Not implemented yet" }
    end

    def verify_user
      render json: { message: "Not implemented yet" }
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
end