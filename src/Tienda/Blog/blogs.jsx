import React from 'react';
import './blog.css'

export default function Blog() {
  return (
    <>
      <main className="container my-5">
        <section className="mb-5">
          <h1 className="mb-3">
            Crisis de precios en tarjetas NVIDIA por escasez de componentes claves
          </h1>
          <div className="main-blog">
            <a href="#">
              
            </a>
            <p className="parrafo-cfg">
              Aquí irá la información o el texto descriptivo del blog de NVIDIA.
            </p>
          </div>
        </section>

        <section className="mb-5">
          <h1 className="mb-3">
            Intel vs AMD: La eterna discusión, ¿cuál elegir?
          </h1>
          <div className="main-blog">
            <a href="#">
            </a>
            <p className="parrafo-cfg">
              Aquí irá la información o el texto descriptivo del blog de Intel vs AMD.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}