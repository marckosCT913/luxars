/**
 * @file photographer.model.js
 * @description Modelo de Mongoose para la entidad Photographer en LuxArs.
 */
import mongoose from 'mongoose';

const photographerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
    },
    specialty: {
      type: String,
      required: [true, 'La especialidad es obligatoria']
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const Photographer = mongoose.model('Photographer', photographerSchema);

export default Photographer;