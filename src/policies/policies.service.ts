import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy, PolicyDocument } from './schemas/policy.schema';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Injectable()
export class PoliciesService {
  constructor(@InjectModel(Policy.name) private policyModel: Model<PolicyDocument>) {}

  // Crear una nueva póliza
  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const createdPolicy = new this.policyModel(createPolicyDto);
    return createdPolicy.save();
  }

  // Obtener todas las pólizas
  async findAll(): Promise<Policy[]> {
    return this.policyModel.find().exec();
  }

  // Obtener una póliza por su ID
  async findById(id: string): Promise<Policy> {
    const policy = await this.policyModel.findOne({ id }).exec();
    if (!policy) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada`);
    }
    return policy;
  }

  // Actualizar una póliza
  async update(id: string, updatePolicyDto: UpdatePolicyDto): Promise<Policy> {
    const updatedPolicy = await this.policyModel.findOneAndUpdate({ id }, updatePolicyDto, {
      new: true, // Devuelve el documento actualizado
    }).exec();

    if (!updatedPolicy) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada`);
    }
    return updatedPolicy;
  }

  // Eliminar una póliza
  async remove(id: string): Promise<void> {
    const result = await this.policyModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada`);
    }
  }
}
