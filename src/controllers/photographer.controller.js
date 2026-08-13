/**
 * @file photographer.controller.js
 * @description Controlador para administrar los fotógrafos registrados en LuxArs.
 *
 * Este archivo centraliza la lógica CRUD que interactúa con el modelo de Mongoose
 * `Photographer` y responde con JSON estandarizado al cliente.
 */

import Photographer from '../models/photographer.model.js';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Obtiene todos los fotógrafos disponibles en la base de datos.
 *
 * @async
 * @function find
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Lista de fotógrafos o error interno.
 */
const find = async (req, res) => {
  try {
    const photographers = await Photographer.find().sort({ createdAt: -1 });
    return res.status(200).json(photographers);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al consultar registros',
      error: error.message
    });
  }
};

/**
 * Obtiene un fotógrafo por su identificador único.
 *
 * @async
 * @function findOne
 * @param {Request} req - Solicitud con el parámetro `id`.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Fotógrafo encontrado o 404.
 */
const findOne = async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id);

    if (!photographer) {
      return res.status(404).json({ message: 'Fotógrafo no encontrado' });
    }

    return res.status(200).json(photographer);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al consultar el registro',
      error: error.message
    });
  }
};

/**
 * Crea un nuevo registro de fotógrafo en la base de datos.
 *
 * @async
 * @function InsertOne
 * @param {Request} req - Solicitud con los datos del fotógrafo.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Registro creado con código 201.
 */
const InsertOne = async (req, res) => {
  try {
    const newPhotographer = new Photographer(req.body);
    const savedPhotographer = await newPhotographer.save();

    return res.status(201).json(savedPhotographer);
  } catch (error) {
    return res.status(400).json({
      message: 'Error al insertar el registro',
      error: error.message
    });
  }
};

/**
 * Actualiza un fotógrafo existente por su ID.
 *
 * @async
 * @function findOneAndUpdate
 * @param {Request} req - Solicitud con el `id` del fotógrafo a actualizar.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Fotógrafo actualizado o error de validación.
 */
const findOneAndUpdate = async (req, res) => {
  try {
    const updatedPhotographer = await Photographer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPhotographer) {
      return res.status(404).json({ message: 'Registro no encontrado para actualizar' });
    }

    return res.status(200).json(updatedPhotographer);
  } catch (error) {
    return res.status(400).json({
      message: 'Error al actualizar el registro',
      error: error.message
    });
  }
};

/**
 * Elimina un fotógrafo según su ID.
 *
 * @async
 * @function findOneAndDelete
 * @param {Request} req - Solicitud con el identificador que se desea borrar.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<Response>} Confirmación de eliminación o error.
 */
const findOneAndDelete = async (req, res) => {
  try {
    const deletedPhotographer = await Photographer.findByIdAndDelete(req.params.id);

    if (!deletedPhotographer) {
      return res.status(404).json({ message: 'Registro no encontrado para eliminar' });
    }

    return res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el registro',
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