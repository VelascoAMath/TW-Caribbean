class UserFileController < ApplicationController

    def index
        render json: UserFile.all
    end
end
