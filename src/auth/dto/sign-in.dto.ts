import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class SignInDto {
    @ApiProperty({
        example: 'levan@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        example: 'levan123',
        required: true,
        minLength: 6,
        maxLength: 20
    })
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string

}