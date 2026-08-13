/**
 * @file booking.controller.js
 * @description Controlador para gestionar las operaciones CRUD del módulo de reservas de LuxArs.
 *
 * Este archivo encapsula la lógica de negocio para crear, consultar, actualizar y eliminar
 * registros de reservas en la base de datos MongoDB mediante Mongoose.
 */

import Booking from '../models/booking.model.js';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Obtiene la lista completa de reservas registradas.
 *
 * @async
 * @function find
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Respuesta con el listado de reservas o un error.
 */
const find = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al consultar las reservas',
      error: error.message
    });
  }
};

/**
 * Consulta una reserva por su identificador único.
 *
 * @async
 * @function findOne
 * @param {Request} req - Solicitud con el parámetro `id`.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Reserva encontrada o mensaje de no encontrado.
 */
const findOne = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al consultar la reserva',
      error: error.message
    });
  }
};

/**
 * Crea una nueva reserva con la información recibida en el cuerpo de la solicitud.
 *
 * @async
 * @function InsertOne
 * @param {Request} req - Solicitud HTTP con el payload de la reserva.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Recurso creado con estado 201.
 */
const InsertOne = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    return res.status(201).json(savedBooking);
  } catch (error) {
    return res.status(400).json({
      message: 'Error al crear la reserva',
      error: error.message
    });
  }
};

/**
 * Actualiza una reserva existente por su ID.
 *
 * @async
 * @function findOneAndUpdate
 * @param {Request} req - Solicitud con el `id` a actualizar y los nuevos datos.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Reserva actualizada o error 404/400.
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

    return res.status(200).json(updatedBooking);
  } catch (error) {
    return res.status(400).json({
      message: 'Error al actualizar la reserva',
      error: error.message
    });
  }
};

/**
 * Elimina una reserva existente por su ID.
 *
 * @async
 * @function findOneAndDelete
 * @param {Request} req - Solicitud con el `id` de la reserva a eliminar.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Confirmación de eliminación o error 404/500.
 */
const findOneAndDelete = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Reserva no encontrada para eliminar' });
    }

    return res.status(200).json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar la reserva',
      error: error.message
    });
  }
};

export {
  find,
  findOne,
  InsertOne,
  findOneAndUpdate,
  findOneAndDelete
};