class UserFileController < ApplicationController
    skip_forgery_protection
    
    def index
        render json: UserFile.all
    end

    def show
        render json: UserFile.find(params[:id]);
    end

    def new
        @user_file = UserFile.new
    end

    def create
        @user_file = UserFile.new(user_file_params)

        if @user_file.save
            redirect_to @user_file
          else
            render json: @user_file.errors, status: :unprocessable_entity
          end

    end

    def update
        permitted = params.permit(user_file: [:content])
        id = permitted.to_hash()["id"]
        content = permitted.to_hash()["user_file"]["content"]
        user_file = UserFile.find(params[:id])
        user_file.content = content
        user_file.save!
        render plain: "YES"
    end

    private

    def user_file_params
        params.require(:user_file).permit(:name) # Adjust permitted parameters as needed
    end
end
