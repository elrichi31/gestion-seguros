import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  // Crear un nuevo cliente, asegurando que esté vinculado a una entidad
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  // Obtener todos los clientes de una entidad específica
  async findAll(entityId: string): Promise<Customer[]> {
    return this.customerModel.find({ entityId }).exec();
  }

  // Obtener un cliente específico por ID dentro de una entidad
  async findById(id: string, entityId: string): Promise<Customer> {
    const customer = await this.customerModel.findOne({ _id: id, entityId }).exec();
    if (!customer) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado en la entidad ${entityId}`);
    }
    return customer;
  }

  // Actualizar un cliente dentro de una entidad
  async update(id: string, updateCustomerDto: UpdateCustomerDto, entityId: string): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findOneAndUpdate(
      { _id: id, entityId },  // Asegurar que el cliente pertenece a la entidad
      updateCustomerDto,
      { new: true },  // Devuelve el cliente actualizado
    ).exec();

    if (!updatedCustomer) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado en la entidad ${entityId}`);
    }
    return updatedCustomer;
  }

  // Eliminar un cliente dentro de una entidad
  async remove(id: string, entityId: string): Promise<void> {
    const result = await this.customerModel.deleteOne({ _id: id, entityId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado en la entidad ${entityId}`);
    }
  }
}
