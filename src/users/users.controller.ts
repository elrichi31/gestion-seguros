import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { GetEntityId } from '../common/decorators/entity.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')  // Etiqueta para Swagger
@ApiBearerAuth()  // Autenticación con JWT
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get()
  @Roles('admin')  // Solo administradores pueden ver todos los usuarios
  async findAll(@GetEntityId() entityId: string) {
    return this.usersService.findAll(entityId);
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get(':id')
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden ver un usuario específico
  async findOne(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.usersService.findById(id, entityId);
  }

  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Put(':id')
  @Roles('admin')  // Solo administradores pueden actualizar usuarios
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @GetEntityId() entityId: string) {
    return this.usersService.update(id, updateUserDto, entityId);
  }

  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Delete(':id')
  @Roles('admin')  // Solo administradores pueden eliminar usuarios
  async remove(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.usersService.remove(id, entityId);
  }
}
