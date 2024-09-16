import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, unique: true })
  quoteNumber: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  policyDetails: string; // Detalles de la póliza propuesta

  @Prop({ required: true })
  entityId: string; // Referencia a la entidad asociada
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
