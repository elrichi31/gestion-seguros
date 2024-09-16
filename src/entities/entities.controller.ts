import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { GetEntityId } from '../common/decorators/entity.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('entities')
@ApiBearerAuth()
@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @ApiOperation({ summary: 'Crear una nueva entidad' })
  @ApiResponse({ status: 201, description: 'Entidad creada con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Post()
  @Roles('admin') // Solo usuarios con rol 'admin' pueden crear entidades
  async create(
    @Body() createEntityDto: CreateEntityDto,
    @GetEntityId() entityId: string,
  ) {
    return this.entitiesService.create(createEntityDto, entityId);
  }

  @ApiOperation({ summary: 'Obtener todas las entidades de una entidad' })
  @ApiResponse({ status: 200, description: 'Lista de entidades obtenida con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get()
  @Roles('admin', 'broker') // 'admin' y 'broker' pueden ver las entidades
  async findAll(@GetEntityId() entityId: string) {
    return this.entitiesService.findAll(entityId);
  }

  @ApiOperation({ summary: 'Obtener una entidad por ID' })
  @ApiResponse({ status: 200, description: 'Entidad obtenida con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @ApiResponse({ status: 404, description: 'Entidad no encontrada.' })
  @Get(':id')
  @Roles('admin', 'broker', 'cliente') // 'admin', 'broker', y 'cliente' pueden ver una entidad específica
  async findOne(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.entitiesService.findById(id, entityId);
  }

  @ApiOperation({ summary: 'Actualizar una entidad por ID' })
  @ApiResponse({ status: 200, description: 'Entidad actualizada con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @ApiResponse({ status: 404, description: 'Entidad no encontrada.' })
  @Put(':id')
  @Roles('admin') // Solo usuarios con rol 'admin' pueden actualizar entidades
  async update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto,
    @GetEntityId() entityId: string,
  ) {
    return this.entitiesService.update(id, updateEntityDto, entityId);
  }

  @ApiOperation({ summary: 'Eliminar una entidad por ID' })
  @ApiResponse({ status: 200, description: 'Entidad eliminada con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @ApiResponse({ status: 404, description: 'Entidad no encontrada.' })
  @Delete(':id')
  @Roles('admin') // Solo usuarios con rol 'admin' pueden eliminar entidades
  async remove(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.entitiesService.remove(id, entityId);
  }
}
