import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  public _id!: string;

  @prop({ requierd: true })
  public name!: string;

  @prop({ requierd: true, unique: true })
  public slug!: string;

  @prop({ requierd: true })
  public image!: string;

  @prop({ requierd: true })
  public brand!: string;

  @prop({ requierd: true })
  public category!: string;

  @prop({ requierd: true })
  public description!: string;

  @prop({ requierd: true, default: 0 })
  public price!: number;

  @prop({ requierd: true, default: 0 })
  public countInStock!: number;

  @prop({ requierd: true, default: 0 })
  public rating!: number;

  @prop({ requierd: true, default: 0 })
  public numReviews!: number;
}

export const ProductModel = getModelForClass(Product);
