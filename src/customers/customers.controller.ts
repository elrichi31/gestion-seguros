import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { GetEntityId } from '../common/decorators/entity.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')  // Etiqueta para Swagger
@ApiBearerAuth()  // JWT authentication
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Post()
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden crear clientes
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @GetEntityId() entityId: string,  // Asegurar que el cliente esté vinculado a la entidad
  ) {
    createCustomerDto.entityId = entityId;  // Establecer el entityId en el DTO
    return this.customersService.create(createCustomerDto);
  }

  @ApiOperation({ summary: 'Obtener todos los clientes de una entidad' })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get()
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden ver todos los clientes
  async findAll(@GetEntityId() entityId: string) {
    return this.customersService.findAll(entityId);
  }

  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente obtenido con éxito.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get(':id')
  @Roles('admin', 'broker', 'cliente')  // Todos los roles pueden ver un cliente específico
  async findOne(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.customersService.findById(id, entityId);
  }

  @ApiOperation({ summary: 'Actualizar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado con éxito.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Put(':id')
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden actualizar clientes
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @GetEntityId() entityId: string,
  ) {
    return this.customersService.update(id, updateCustomerDto, entityId);
  }

  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Delete(':id')
  @Roles('admin')  // Solo administradores pueden eliminar clientes
  async remove(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.customersService.remove(id, entityId);
  }
}
