import { useState } from 'react'
import { BsArrowRightShort, BsArrowUpRight, BsBag, BsDisc, BsCheck } from "react-icons/bs"
import { Link } from 'react-router-dom'
import './home.css'

const vinilos = [
  {
    id: 1,
    nombre: 'Nevermind',
    artista: 'Nirvana',
    genero: 'Grunge',
    precio: 32990,
    imagen: '/vinilos/nevermind.jpg'
  },
  {
    id: 2,
    nombre: 'OK Computer',
    artista: 'Radiohead',
    genero: 'Alternativo',
    precio: 34990,
    imagen: '/vinilos/ok-computer.jpg'
  },
  {
    id: 3,
    nombre: 'Rumours',
    artista: 'Fleetwood Mac',
    genero: 'Rock',
    precio: 32990,
    imagen: '/vinilos/rumours.jpg'
  },
  {
    id: 4,
    nombre: 'The Queen Is Dead',
    artista: 'The Smiths',
    genero: 'Indie',
    precio: 29990,
    imagen: '/vinilos/the-queen-is-dead.jpg'
  },
  {
    id: 5,
    nombre: 'Ziggy Stardust',
    artista: 'David Bowie',
    genero: 'Glam Rock',
    precio: 32990,
    imagen: '/vinilos/ziggy-stardust.jpg'
  },
  {
    id: 6,
    nombre: 'Back to Black',
    artista: 'Amy Winehouse',
    genero: 'Soul',
    precio: 28990,
    imagen: '/vinilos/back-to-black.jpg'
  }
]

const generos = [
  { nombre: 'ROCK', numero: '01', clase: 'rock' },
  { nombre: 'ALTERNATIVO', numero: '02', clase: 'alternative' },
  { nombre: 'JAZZ', numero: '03', clase: 'jazz' },
  { nombre: 'SOUL & FUNK', numero: '04', clase: 'soul' }
]

const formatoPrecio = (precio) =>
  precio.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  })

function Home() {
  const [agregados, setAgregados] = useState([])

  const agregarCarrito = (vinilo) => {
    setAgregados((actual) =>
      actual.includes(vinilo.id)
        ? actual
        : [...actual, vinilo.id]
    )
  }

  return (
    <main className="offbeat-home">

      <section className="offbeat-hero">
        <div className="hero-photo" />

        <div className="hero-grain" />

        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span>INDEPENDENT VINYL STORE</span>
              <span>EST. 2026 — CHILE</span>
            </div>

            <h1>
              MÚSICA
              <br />
              EN FORMATO
              <br />
              <span>REAL.</span>
            </h1>

            <p>
              Discos para descubrir, coleccionar
              y escuchar una y otra vez.
            </p>

            <a href="#destacados" className="hero-cta">
              Explorar vinilos
              <BsArrowRightShort size={20} />
            </a>

            <span className="hero-bottom-label">
              VINYL · MUSIC · CULTURE
            </span>
          </div>
        </div>

        <div className="hero-sticker">
          <BsDisc size={27}/>
          <span>
            THE SOUND
            <br />
            OF SOMETHING
            <br />
            DIFFERENT.
          </span>
        </div>

        <div className="hero-side-label">
          OFFBEAT RECORDS / 33⅓ RPM
        </div>
      </section>


      <section className="offbeat-featured" id="destacados">
        <div className="featured-heading">
          <div>
            <span className="section-eyebrow">
              01 / DISCOS DESTACADOS
            </span>
            <h2>
              En rotación<span>.</span>
            </h2>
            <p>
              Grandes álbumes, buenas historias
              y música que merece una vuelta más.
            </p>
          </div>

          <Link to="/producto" className="section-link">
            Ver catálogo
            <BsArrowUpRight size={18} />
          </Link>
        </div>

        <div className="vinyl-grid">
          {vinilos.map((vinilo) => {
            const agregado = agregados.includes(vinilo.id)

            return (
              <article className="vinyl-card" key={vinilo.id}>
                <div className="vinyl-artwork">
                  <img
                    src={vinilo.imagen}
                    alt={`Portada de ${vinilo.nombre}`}
                    loading="lazy"
                  />

                  <span className="vinyl-genre">
                    {vinilo.genero}
                  </span>
                </div>

                <div className="vinyl-details">
                  <div className="vinyl-description">
                    <h3>{vinilo.nombre}</h3>
                    <p>{vinilo.artista}</p>
                    <strong>
                      {formatoPrecio(vinilo.precio)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className={`vinyl-add ${agregado ? 'added' : ''}`}
                    onClick={() => agregarCarrito(vinilo)}
                    aria-label={
                      agregado
                        ? `${vinilo.nombre} seleccionado`
                        : `Seleccionar ${vinilo.nombre}`
                    }
                    title={
                      agregado
                        ? 'Seleccionado en esta demostración'
                        : 'Seleccionar disco'
                    }
                  >
                    {agregado
                      ? <BsCheck size={19} />
                      : <BsBag size={19} />
                    }
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="offbeat-categories">
        <div className="categories-heading">
          <span className="section-eyebrow">
            02 / ENCUENTRA TU SONIDO
          </span>

          <h2>
            Cada disco tiene
            <br />
            su propia historia<span>.</span>
          </h2>
        </div>

        <div className="genre-grid">
          {generos.map((genero) => (
            <Link
              to={`/productos?genero=${encodeURIComponent(genero.nombre)}`}
              className={`genre-card ${genero.clase}`}
              key={genero.numero}
            >
              <span className="genre-number">
                {genero.numero} / OFFBEAT
              </span>

              <BsDisc className="genre-disc" />

              <div className="genre-bottom">
                <h3>{genero.nombre}</h3>
                <BsArrowUpRight size={25} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home