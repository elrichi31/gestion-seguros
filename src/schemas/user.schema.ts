import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'broker', 'cliente'] })
  role: string;

  @Prop({ required: true })
  entityId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
