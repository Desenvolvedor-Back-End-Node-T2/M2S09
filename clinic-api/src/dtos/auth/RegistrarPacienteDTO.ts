/**
 * @openapi
 * components:
 *   schemas:
 *     RegistrarPacienteDTO:
 *       type: object
 *       required: [nome, email, senha]
 *       properties:
 *         nome: { type: string, example: "Ana Lima" }
 *         email: { type: string, format: email, example: "ana@email.com" }
 *         senha: { type: string, format: password, minLength: 6 }
 *         dataNascimento: { type: string, format: date, example: "1995-04-12" }
 */

import {IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsDateString} from 'class-validator';

export class RegistrarPacienteDTO {
    @IsNotEmpty({message: "O nome é obrigatório"})
    nome!: string

    @IsEmail({}, {message: "O email deve ser válido"})
    email!: string 

    @MinLength(6, {message: "A senha deve ter no mínimo 6 caracteres"})
    senha!: string

    @IsOptional()
    @IsDateString({}, {message: "A data de nascimento deve ser uma data válida"})
    dataNascimento?: string
}