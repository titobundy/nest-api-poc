import * as mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});
// ProductSchema.virtual('id').get(function() { return this._id; });
ProductSchema.set('toJSON', {
    // virtuals: true,
    versionKey: false,
    // transform: function (doc, ret) {   delete ret._id  }
});

export { ProductSchema } ;

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
} 