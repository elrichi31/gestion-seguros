import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from './schemas/quote.schema';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>) {}

  // Crear una nueva cotización
  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const createdQuote = new this.quoteModel(createQuoteDto);
    return createdQuote.save();
  }

  // Obtener todas las cotizaciones
  async findAll(): Promise<Quote[]> {
    return this.quoteModel.find().exec();
  }

  // Obtener una cotización por su ID
  async findById(id: string): Promise<Quote> {
    const quote = await this.quoteModel.findOne({ id }).exec();
    if (!quote) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }
    return quote;
  }

  // Actualizar una cotización
  async update(id: string, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const updatedQuote = await this.quoteModel.findOneAndUpdate({ id }, updateQuoteDto, {
      new: true, // Devuelve el documento actualizado
    }).exec();

    if (!updatedQuote) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }
    return updatedQuote;
  }

  // Eliminar una cotización
  async remove(id: string): Promise<void> {
    const result = await this.quoteModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }
  }
}
