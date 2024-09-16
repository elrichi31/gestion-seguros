import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { GetEntityId } from '../common/decorators/entity.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('policies')  // Etiqueta para Swagger
@ApiBearerAuth()  // Autenticación con JWT
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @ApiOperation({ summary: 'Crear una nueva póliza' })
  @ApiResponse({ status: 201, description: 'Póliza creada con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Post()
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden crear pólizas
  async create(
    @Body() createPolicyDto: CreatePolicyDto,
    @GetEntityId() entityId: string,  // Asociar la póliza a la entidad correcta
  ) {
    createPolicyDto.entityId = entityId;  // Asignar el entityId del usuario
    return this.policiesService.create(createPolicyDto);
  }

  @ApiOperation({ summary: 'Obtener todas las pólizas de una entidad' })
  @ApiResponse({ status: 200, description: 'Lista de pólizas obtenida con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get()
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden ver todas las pólizas
  async findAll(@GetEntityId() entityId: string) {
    return this.policiesService.findAll(entityId);
  }

  @ApiOperation({ summary: 'Obtener una póliza por ID' })
  @ApiResponse({ status: 200, description: 'Póliza obtenida con éxito.' })
  @ApiResponse({ status: 404, description: 'Póliza no encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get(':id')
  @Roles('admin', 'broker', 'cliente')  // Administradores, brokers y clientes pueden ver pólizas específicas
  async findOne(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.policiesService.findById(id, entityId);
  }

  @ApiOperation({ summary: 'Actualizar una póliza por ID' })
  @ApiResponse({ status: 200, description: 'Póliza actualizada con éxito.' })
  @ApiResponse({ status: 404, description: 'Póliza no encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Put(':id')
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden actualizar pólizas
  async update(
    @Param('id') id: string,
    @Body() updatePolicyDto: UpdatePolicyDto,
    @GetEntityId() entityId: string,
  ) {
    return this.policiesService.update(id, updatePolicyDto, entityId);
  }

  @ApiOperation({ summary: 'Eliminar una póliza por ID' })
  @ApiResponse({ status: 200, description: 'Póliza eliminada con éxito.' })
  @ApiResponse({ status: 404, description: 'Póliza no encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Delete(':id')
  @Roles('admin')  // Solo administradores pueden eliminar pólizas
  async remove(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.policiesService.remove(id, entityId);
  }
}
