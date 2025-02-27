import { Exclude } from "class-transformer"
import { IsString } from "class-validator"

export class LoginBodyDTO{
    @IsString({message: 'Lỗi email bị trùng hoặc có thể lỗi vui lòng kiểm tra lại'})
    email: string
    @IsString({message: 'Lỗi name'})
    password: string
}

export class RegisterBodyDTO extends LoginBodyDTO{
    @IsString({message: 'Lỗi name'})
    name: string
    @IsString({message: 'Lỗi CofirmPassword'})
    confirmPassword: string
}

export class RegisterResDTO{
    id: number
    name: string
    email: string
    @Exclude() password: string
    created_at: Date
    updated_at: Date

    constructor(partial: Partial<RegisterResDTO>){
        Object.assign(this, partial);
    }
}