import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Buscar un usuario por su correo electrónico
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  // Obtener todos los usuarios de una entidad
  async findAll(entityId: string): Promise<User[]> {
    return this.userModel.find({ entityId }).exec();
  }

  // Obtener un usuario por su ID dentro de una entidad
  async findById(id: string, entityId: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id, entityId }).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado en la entidad ${entityId}`);
    }
    return user;
  }

  // Actualizar un usuario
  async update(id: string, updateUserDto: UpdateUserDto, entityId: string): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id, entityId },  // Asegurarse de que el usuario pertenece a la entidad correcta
      updateUserDto,
      { new: true },  // Devolver el usuario actualizado
    ).exec();

    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado en la entidad ${entityId}`);
    }
    return updatedUser;
  }

  // Eliminar un usuario
  async remove(id: string, entityId: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id, entityId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado en la entidad ${entityId}`);
    }
  }
}
