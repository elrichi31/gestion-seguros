import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec();
    }

    // Obtener todos los usuarios
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    // Obtener un usuario por su ID
    async findById(id: string): Promise<User> {
        const user = await this.userModel.findOne({ id }).exec();
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    // Actualizar un usuario
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findOneAndUpdate({ id }, updateUserDto, {
            new: true, // Devuelve el documento actualizado
        }).exec();

        if (!updatedUser) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return updatedUser;
    }

    // Eliminar un usuario
    async remove(id: string): Promise<void> {
        const result = await this.userModel.deleteOne({ id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }
}
