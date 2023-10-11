class UserFileController < ApplicationController
    skip_forgery_protection
    
    def index
        render json: UserFile.all
    end

    def show
        render plain: "Hello " + params[:id]
    end

    def new
        Rails.logger.info(params)
        @user_file = UserFile.new
    end

    def create
        Rails.logger.info("--------------------");
        Rails.logger.info(user_file_params)
        @user_file = UserFile.new(user_file_params)

        if @user_file.save
            redirect_to @user_file
          else
            render json: @user_file.errors, status: :unprocessable_entity
          end

    end

    private

    def user_file_params
        params.require(:user_file).permit(:name) # Adjust permitted parameters as needed
    end
end
