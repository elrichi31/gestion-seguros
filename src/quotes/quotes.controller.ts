import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  // Crear una nueva cotización
  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  // Obtener todas las cotizaciones
  @Get()
  async findAll() {
    return this.quotesService.findAll();
  }

  // Obtener una cotización por su ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quotesService.findById(id);
  }

  // Actualizar una cotización por su ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  // Eliminar una cotización por su ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }
}
