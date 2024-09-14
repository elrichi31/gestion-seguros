import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity, EntityDocument } from '../schemas/entity.schema';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntitiesService {
    constructor(@InjectModel(Entity.name) private entityModel: Model<EntityDocument>) { }

    // Crear una entidad
    async create(createEntityDto: CreateEntityDto): Promise<Entity> {
        const createdEntity = new this.entityModel(createEntityDto);
        return createdEntity.save();
    }

    // Obtener todas las entidades
    async findAll(): Promise<Entity[]> {
        return this.entityModel.find().exec();
    }

    // Obtener una entidad por su ID
    async findById(id: string): Promise<Entity> {
        const entity = await this.entityModel.findOne({ id }).exec();
        if (!entity) {
            throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
        }
        return entity;
    }

    // Actualizar una entidad por su ID
    async update(id: string, updateEntityDto: UpdateEntityDto): Promise<Entity> {
        const updatedEntity = await this.entityModel.findOneAndUpdate({ id }, updateEntityDto, {
            new: true, // Devuelve el documento actualizado
        }).exec();

        if (!updatedEntity) {
            throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
        }
        return updatedEntity;
    }

    // Eliminar una entidad por su ID
    async remove(id: string): Promise<{ message: string }> {
        const result = await this.entityModel.deleteOne({ id }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
        }

        // Enviar mensaje al usuario cuando ya se eliminó la entidad
        return { message: `Entidad con ID ${id} eliminada exitosamente` };
    }
}
