/**
 * @file booking.controller.js
 * @description Controlador para gestionar las operaciones CRUD del módulo de Reservas en LuxArs.
 */
import Booking from '../models/booking.model.js';

/**
 * @function find
 * @description Obtiene todas las reservas de la base de datos.
 */
const find = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar las reservas', error: error.message });
  }
};

/**
 * @function findOne
 * @description Obtiene una reserva específica según su ID.
 */
const findOne = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar la reserva', error: error.message });
  }
};

/**
 * @function InsertOne
 * @description Crea e inserta una nueva reserva en la base de datos.
 */
const InsertOne = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la reserva', error: error.message });
  }
};

/**
 * @function findOneAndUpdate
 * @description Busca una reserva por su ID y la actualiza con los nuevos datos recibidos.
 */
const findOneAndUpdate = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Reserva no encontrada para actualizar' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la reserva', error: error.message });
  }
};

/**
 * @function findOneAndDelete
 * @description Busca una reserva por su ID y la elimina de la base de datos.
 */
const findOneAndDelete = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Reserva no encontrada para eliminar' });
    }
    res.status(200).json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error: error.message });
  }
};

export {
  find,
  findOne,
  InsertOne,
  findOneAndUpdate,
  findOneAndDelete
};