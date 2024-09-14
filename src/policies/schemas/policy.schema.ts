import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PolicyDocument = Policy & Document;

@Schema()
export class Policy {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, unique: true })
  policyNumber: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  details: string; // Detalles de la póliza (e.g., tipo de seguro, cobertura)

  @Prop({ required: true })
  entityId: string; // Referencia a la entidad asociada
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
