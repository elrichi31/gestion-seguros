import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote, QuoteDocument } from './schemas/quote.schema';

@Injectable()
export class QuotesService {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>) {}

  // Crear una nueva cotización vinculada a una entidad
  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const createdQuote = new this.quoteModel(createQuoteDto);
    return createdQuote.save();
  }

  // Obtener todas las cotizaciones de una entidad
  async findAll(entityId: string): Promise<Quote[]> {
    return this.quoteModel.find({ entityId }).exec();
  }

  // Obtener una cotización específica por ID dentro de una entidad
  async findById(id: string, entityId: string): Promise<Quote> {
    const quote = await this.quoteModel.findOne({ _id: id, entityId }).exec();
    if (!quote) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada en la entidad ${entityId}`);
    }
    return quote;
  }

  // Actualizar una cotización dentro de una entidad
  async update(id: string, updateQuoteDto: UpdateQuoteDto, entityId: string): Promise<Quote> {
    const updatedQuote = await this.quoteModel.findOneAndUpdate(
      { _id: id, entityId },  // Asegurarse de que la cotización pertenece a la entidad
      updateQuoteDto,
      { new: true },  // Devolver la cotización actualizada
    ).exec();

    if (!updatedQuote) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada en la entidad ${entityId}`);
    }
    return updatedQuote;
  }

  // Eliminar una cotización dentro de una entidad
  async remove(id: string, entityId: string): Promise<void> {
    const result = await this.quoteModel.deleteOne({ _id: id, entityId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada en la entidad ${entityId}`);
    }
  }
}
