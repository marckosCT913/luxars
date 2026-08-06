/**
 * @file photographer.controller.js
 * @description Controlador con las funciones CRUD requeridas para LuxArs.
 */
import Photographer from '../models/photographer.model.js';

const find = async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.status(200).json(photographers);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar registros', error: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const photographer = await Photographer.findById(req.params.id);
    if (!photographer) {
      return res.status(404).json({ message: 'Fotógrafo no encontrado' });
    }
    res.status(200).json(photographer);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar el registro', error: error.message });
  }
};

const InsertOne = async (req, res) => {
  try {
    const newPhotographer = new Photographer(req.body);
    const saved = await newPhotographer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error al insertar el registro', error: error.message });
  }
};

const findOneAndUpdate = async (req, res) => {
  try {
    const updated = await Photographer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Registro no encontrado para actualizar' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el registro', error: error.message });
  }
};

const findOneAndDelete = async (req, res) => {
  try {
    const deleted = await Photographer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Registro no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro', error: error.message });
  }
};

export {
  find,
  findOne,
  InsertOne,
  findOneAndUpdate,
  findOneAndDelete
};