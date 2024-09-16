import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntityDocument = Entity & Document;

@Schema()
export class Entity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  contactEmail: string;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
