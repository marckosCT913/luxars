import React, { useState } from "react";
import SubirContenidoModal from "./SubirContenidoModal";

export default function DashboardPortafolio() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleSubirContenido = async (data) => {
    // data = { tipo, archivo, titulo, descripcion, etiquetas }
    console.log("Contenido a subir:", data);

    // Ejemplo: enviar a tu backend con FormData
    // const formData = new FormData();
    // formData.append("tipo", data.tipo);
    // formData.append("archivo", data.archivo);
    // formData.append("titulo", data.titulo);
    // formData.append("descripcion", data.descripcion);
    // formData.append("etiquetas", JSON.stringify(data.etiquetas));
    //
    // await fetch("/api/portafolio/subir", {
    //   method: "POST",
    //   body: formData,
    // });

    setModalAbierto(false);
  };

  return (
    <div>
      <button
        onClick={() => setModalAbierto(true)}
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
      >
        Subir Contenido
      </button>

      <SubirContenidoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleSubirContenido}
        maxSizeMB={50}
      />
    </div>
  );
}
