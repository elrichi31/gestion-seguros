import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  // Crear un nuevo cliente
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  // Obtener todos los clientes
  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  // Obtener un cliente por su ID
  async findById(id: string): Promise<Customer> {
    const customer = await this.customerModel.findOne({ id }).exec();
    if (!customer) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return customer;
  }

  // Actualizar un cliente
  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findOneAndUpdate({ id }, updateCustomerDto, {
      new: true, // Devuelve el documento actualizado
    }).exec();

    if (!updatedCustomer) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return updatedCustomer;
  }

  // Eliminar un cliente
  async remove(id: string): Promise<void> {
    const result = await this.customerModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
  }
}
