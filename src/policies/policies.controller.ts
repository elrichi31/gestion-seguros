import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  // Crear una nueva póliza
  @Post()
  async create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  // Obtener todas las pólizas
  @Get()
  async findAll() {
    return this.policiesService.findAll();
  }

  // Obtener una póliza por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.policiesService.findById(id);
  }

  // Actualizar una póliza por su ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.update(id, updatePolicyDto);
  }

  // Eliminar una póliza por su ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.policiesService.remove(id);
  }
}
