import React, { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon, Video } from "lucide-react";

/**
 * SubirContenidoModal
 * Modal para subir contenido (imagen o video) a un portafolio.
 *
 * Props:
 * - isOpen: boolean            -> controla si el modal se muestra
 * - onClose: () => void        -> se llama al hacer click en X o "Cancelar"
 * - onSubmit: (data) => void   -> se llama al hacer click en "Subir Contenido"
 *                                  data = { tipo, archivo, titulo, descripcion, etiquetas }
 * - maxSizeMB: number          -> tamaño máximo permitido (default 50)
 */
export default function SubirContenidoModal({
  isOpen,
  onClose,
  onSubmit,
  maxSizeMB = 50,
}) {
  const [tipo, setTipo] = useState("imagen"); // "imagen" | "video"
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [etiquetas, setEtiquetas] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  if (!isOpen) return null;

  const acceptTypes =
    tipo === "imagen" ? "image/jpeg,image/png,image/webp" : "video/mp4,video/quicktime,video/x-msvideo";

  const acceptLabel = tipo === "imagen" ? "JPG, PNG, WEBP" : "MP4, MOV, AVI";

  const handleFileSelect = (file) => {
    if (!file) return;
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      alert(`El archivo supera el máximo de ${maxSizeMB}MB`);
      return;
    }
    setArchivo(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const handleSubmit = () => {
    if (!titulo.trim()) {
      alert("El título es obligatorio");
      return;
    }
    onSubmit?.({
      tipo,
      archivo,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      etiquetas: etiquetas
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Subir Contenido</h2>
            <p className="mt-1 text-sm text-gray-500">Añade fotos o videos a tu portafolio</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-6 pt-5 space-y-5">
          {/* Tipo de contenido */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-800">Tipo de contenido</p>
            <div className="grid grid-cols-2 gap-3">
              <TipoOption
                icon={<ImageIcon size={18} className="text-indigo-500" />}
                label="Imagen"
                sub="JPG, PNG, WEBP"
                selected={tipo === "imagen"}
                onClick={() => {
                  setTipo("imagen");
                  setArchivo(null);
                }}
              />
              <TipoOption
                icon={<Video size={18} className="text-pink-500" />}
                label="Video"
                sub="MP4, MOV, AVI"
                selected={tipo === "video"}
                onClick={() => {
                  setTipo("video");
                  setArchivo(null);
                }}
              />
            </div>
          </div>

          {/* Archivo (drag & drop) */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-800">Archivo</p>
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
                isDragging ? "border-gray-500 bg-gray-50" : "border-gray-200 bg-gray-50/50 hover:bg-gray-50"
              }`}
            >
              <Upload size={28} className="mb-3 text-gray-400" />
              <p className="text-sm text-gray-700">
                Haz click para seleccionar o arrastra
                <br />
                el archivo aquí
              </p>
              <p className="mt-1 text-xs text-gray-400">Máximo {maxSizeMB}MB</p>
              {archivo && (
                <p className="mt-3 max-w-full truncate rounded-md bg-white px-3 py-1 text-xs text-gray-600 shadow-sm">
                  {archivo.name}
                </p>
              )}
              <input
                ref={inputRef}
                type="file"
                accept={acceptTypes}
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              *En este prototipo, se usará una imagen de demostración
            </p>
          </div>

          {/* Título */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Sesión de boda en la playa"
              className="w-full rounded-lg bg-gray-100 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Descripción <span className="text-gray-400">(opcional)</span>
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe tu trabajo, técnicas utilizadas, ubicación..."
              rows={3}
              className="w-full resize-none rounded-lg bg-gray-100 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Etiquetas */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Etiquetas <span className="text-gray-400">(opcional)</span>
            </label>
            <input
              type="text"
              value={etiquetas}
              onChange={(e) => setEtiquetas(e.target.value)}
              placeholder="Ej: boda, playa, atardecer (separadas por comas)"
              className="w-full rounded-lg bg-gray-100 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition-colors"
          >
            <Upload size={16} />
            Subir Contenido
          </button>
        </div>
      </div>
    </div>
  );
}

function TipoOption({ icon, label, sub, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
        selected ? "border-gray-800 bg-gray-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <span
        className={`mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-gray-900" : "border-gray-300"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-gray-900" />}
      </span>
      <span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
          {icon}
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-gray-500">{sub}</span>
      </span>
    </button>
  );
}
