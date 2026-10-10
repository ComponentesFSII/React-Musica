import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nosotros from "../Tienda/Nosotros/nosotros";

// La vista usa Link, por lo que se renderiza dentro de un MemoryRouter
const renderizar = () =>
  render(
    <MemoryRouter>
      <Nosotros />
    </MemoryRouter>
  );

describe("Vista Nosotros - renderizado de las historias (historias.map)", () => {
  it("muestra las 3 historias con su número, título e imagen", () => {
    renderizar();

    // Etiquetas con número
    expect(screen.getByText("01 / NUESTRA HISTORIA")).toBeInTheDocument();
    expect(screen.getByText("02 / NUESTRA PASIÓN")).toBeInTheDocument();
    expect(screen.getByText("03 / NUESTRA IDENTIDAD")).toBeInTheDocument();

    // Títulos (h3)
    const titulos = screen
      .getAllByRole("heading", { level: 3 })
      .map((titulo) => titulo.textContent);
    expect(titulos).toEqual([
      "Todo comienza con una canción.",
      "El encanto de lo analógico.",
      "Un ritmo diferente.",
    ]);

    // Imágenes con su texto alternativo y su ruta
    expect(
      screen.getByAltText("Interior de una tienda de discos de vinilo")
    ).toHaveAttribute("src", "/images/nosotros-historia.jpg");
    expect(screen.getByAltText("Tocadiscos reproduciendo un vinilo")).toHaveAttribute(
      "src",
      "/images/nosotros-vinilo.jpg"
    );
    expect(screen.getByAltText("Colección de discos de vinilo")).toHaveAttribute(
      "src",
      "/images/nosotros-cultura.jpg"
    );

    // Etiquetas "SIDE" de cada imagen
    expect(screen.getByText("SIDE 01")).toBeInTheDocument();
    expect(screen.getByText("SIDE 02")).toBeInTheDocument();
    expect(screen.getByText("SIDE 03")).toBeInTheDocument();
  });

  it("alterna la clase reverse: solo la historia del medio va invertida", () => {
    renderizar();

    const tarjetas = screen.getAllByRole("article");

    expect(tarjetas).toHaveLength(3);
    expect(tarjetas[0]).not.toHaveClass("reverse");
    expect(tarjetas[1]).toHaveClass("reverse");
    expect(tarjetas[2]).not.toHaveClass("reverse");
  });
});

describe("Vista Nosotros - enlaces y contenido principal", () => {
  it("el botón final lleva a la tienda (/producto)", () => {
    renderizar();

    expect(
      screen.getByRole("link", { name: "Explorar la tienda" })
    ).toHaveAttribute("href", "/producto");
  });

  it("el enlace del inicio apunta a la sección de historia, que existe en la página", () => {
    const { container } = renderizar();

    expect(
      screen.getByRole("link", { name: "Conoce nuestra historia" })
    ).toHaveAttribute("href", "#nuestra-historia");
    expect(container.querySelector("#nuestra-historia")).toBeInTheDocument();
  });

  it("incluye el video de YouTube con su título", () => {
    renderizar();

    expect(
      screen.getByTitle("Offbeat Records - Siente el sonido")
    ).toHaveAttribute("src", "https://www.youtube.com/embed/_TB_wvYFox4");
  });

  it("muestra el título principal de la página", () => {
    renderizar();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /NO SEGUIMOS\s*EL MISMO RITMO\./
    );
  });
});