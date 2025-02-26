
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { config } from 'dotenv';
import * as fs from 'fs'; 
import * as path from 'path';

config({
    path: '.env',
})


if (!fs.existsSync(path.resolve('.env'))) {
    console.log('khoong tìm thấy file env')
    process.exit(1)
}

class ConfigSchema {
    @IsString()
    DATABASE_URL: string
    @IsString()
    ACCESS_TOKEN_SECRET:string
    @IsString()
    ACCESS_TOKEN_EXPIRES_IN:string
    @IsString()
    REFRESH_TOKEN_SECRET:string
    @IsString()
    REFRESH_TOKEN_EXPIRES_IN:string
    
}

const configServer = plainToInstance(ConfigSchema, process.env)
const e = validateSync(configServer)
if(e.length>0){
    console.log('các giá trị khai báo trong file .env không hợp lê ')
    const errors =e.map(eItem=>{
        return{
            property: eItem.property,
            constraints: eItem.constraints,
            value: eItem.value,
        }
    })
    throw errors
}
const envCofig =configServer
export default envCofig