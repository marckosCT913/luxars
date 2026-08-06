/**
 * @file booking.model.js
 * @description Modelo de Mongoose para la gestión de reservas de sesiones fotográficas en LuxArs.
 */
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'El nombre del cliente es obligatorio'],
      trim: true
    },
    eventDate: {
      type: Date,
      required: [true, 'La fecha del evento o sesión es obligatoria']
    },
    location: {
      type: String,
      required: [true, 'La ubicación de la sesión es obligatoria'],
      trim: true
    },
    status: {
      type: String,
      enum: ['pendiente', 'confirmada', 'completada', 'cancelada'],
      default: 'pendiente'
    },
    totalAmount: {
      type: Number,
      required: [true, 'El valor de la reserva es obligatorio']
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;