import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { GetEntityId } from '../common/decorators/entity.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('quotes')  // Etiqueta para Swagger
@ApiBearerAuth()  // Autenticación JWT
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @ApiOperation({ summary: 'Crear una nueva cotización' })
  @ApiResponse({ status: 201, description: 'Cotización creada con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Post()
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden crear cotizaciones
  async create(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetEntityId() entityId: string,  // Asociar la cotización a la entidad
  ) {
    createQuoteDto.entityId = entityId;  // Asignar el entityId del usuario
    return this.quotesService.create(createQuoteDto);
  }

  @ApiOperation({ summary: 'Obtener todas las cotizaciones de una entidad' })
  @ApiResponse({ status: 200, description: 'Lista de cotizaciones obtenida con éxito.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get()
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden ver todas las cotizaciones
  async findAll(@GetEntityId() entityId: string) {
    return this.quotesService.findAll(entityId);
  }

  @ApiOperation({ summary: 'Obtener una cotización por ID' })
  @ApiResponse({ status: 200, description: 'Cotización obtenida con éxito.' })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Get(':id')
  @Roles('admin', 'broker', 'cliente')  // Administradores, brokers y clientes pueden ver cotizaciones específicas
  async findOne(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.quotesService.findById(id, entityId);
  }

  @ApiOperation({ summary: 'Actualizar una cotización por ID' })
  @ApiResponse({ status: 200, description: 'Cotización actualizada con éxito.' })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Put(':id')
  @Roles('admin', 'broker')  // Solo administradores y brokers pueden actualizar cotizaciones
  async update(
    @Param('id') id: string,
    @Body() updateQuoteDto: UpdateQuoteDto,
    @GetEntityId() entityId: string,
  ) {
    return this.quotesService.update(id, updateQuoteDto, entityId);
  }

  @ApiOperation({ summary: 'Eliminar una cotización por ID' })
  @ApiResponse({ status: 200, description: 'Cotización eliminada con éxito.' })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido. No tienes acceso.' })
  @Delete(':id')
  @Roles('admin')  // Solo administradores pueden eliminar cotizaciones
  async remove(@Param('id') id: string, @GetEntityId() entityId: string) {
    return this.quotesService.remove(id, entityId);
  }
}
