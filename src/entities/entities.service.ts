// src/entities/entities.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity, EntityDocument } from './schemas/entity.schema';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntitiesService {
  constructor(@InjectModel(Entity.name) private entityModel: Model<EntityDocument>) {}

  // Crear una nueva entidad
  async create(createEntityDto: CreateEntityDto, entityId: string): Promise<Entity> {
    const createdEntity = new this.entityModel({
      ...createEntityDto,
      entityId, // Asociar la entidad al entityId correcto
    });
    return createdEntity.save();
  }

  // Obtener todas las entidades de un tenant
  async findAll(entityId: string): Promise<Entity[]> {    
    const entity = await this.entityModel.find({id: entityId}).exec();
    return entity
  }

  // Obtener una entidad por su ID y entityId
  async findById(id: string, entityId: string): Promise<Entity> {
    const entity = await this.entityModel.findOne({ id, entityId }).exec();
    if (!entity) {
      throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
    }
    return entity;
  }

  // Actualizar una entidad
  async update(id: string, updateEntityDto: UpdateEntityDto, entityId: string): Promise<Entity> {
    const updatedEntity = await this.entityModel.findOneAndUpdate(
      { id, entityId },
      updateEntityDto,
      { new: true },
    ).exec();

    if (!updatedEntity) {
      throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
    }
    return updatedEntity;
  }

  // Eliminar una entidad
  async remove(id: string, entityId: string): Promise<void> {
    const result = await this.entityModel.deleteOne({ id, entityId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Entidad con ID ${id} no encontrada`);
    }
  }
}
