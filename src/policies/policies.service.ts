import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { Policy, PolicyDocument } from './schemas/policy.schema';

@Injectable()
export class PoliciesService {
  constructor(@InjectModel(Policy.name) private policyModel: Model<PolicyDocument>) {}

  // Crear una nueva póliza vinculada a una entidad
  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const createdPolicy = new this.policyModel(createPolicyDto);
    return createdPolicy.save();
  }

  // Obtener todas las pólizas de una entidad
  async findAll(entityId: string): Promise<Policy[]> {
    return this.policyModel.find({ entityId }).exec();
  }

  // Obtener una póliza específica por ID dentro de una entidad
  async findById(id: string, entityId: string): Promise<Policy> {
    const policy = await this.policyModel.findOne({ _id: id, entityId }).exec();
    if (!policy) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada en la entidad ${entityId}`);
    }
    return policy;
  }

  // Actualizar una póliza dentro de una entidad
  async update(id: string, updatePolicyDto: UpdatePolicyDto, entityId: string): Promise<Policy> {
    const updatedPolicy = await this.policyModel.findOneAndUpdate(
      { _id: id, entityId },  // Asegurarse de que la póliza pertenece a la entidad
      updatePolicyDto,
      { new: true },  // Devuelve la póliza actualizada
    ).exec();

    if (!updatedPolicy) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada en la entidad ${entityId}`);
    }
    return updatedPolicy;
  }

  // Eliminar una póliza dentro de una entidad
  async remove(id: string, entityId: string): Promise<void> {
    const result = await this.policyModel.deleteOne({ _id: id, entityId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada en la entidad ${entityId}`);
    }
  }
}
