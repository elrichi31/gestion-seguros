import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  // Crear una nueva entidad
  @Post()
  async create(@Body() createEntityDto: CreateEntityDto) {
    return this.entitiesService.create(createEntityDto);
  }

  // Obtener todas las entidades
  @Get()
  async findAll() {
    return this.entitiesService.findAll();
  }

  // Obtener una entidad por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.entitiesService.findById(id);
  }

  // Actualizar una entidad por su ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entitiesService.update(id, updateEntityDto);
  }

  // Eliminar una entidad por su ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.entitiesService.remove(id);
  }
}
