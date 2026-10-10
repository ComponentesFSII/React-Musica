import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Perfil from "../Admin/Perfil/perfil";
import CambiarPsswd from "../Admin/Perfil/cambiarPsswd";

// vi.hoisted permite usar la variable dentro de vi.mock (que se ejecuta primero).
// Solo se simula useNavigate; Link, Routes, useParams, etc. siguen siendo los reales.
const navigateMock = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock };
});

// Respuesta simulada de fetch
const responder = (data) =>
  Promise.resolve({ json: () => Promise.resolve(data) });

// Preparación común antes de cada test
beforeEach(() => {
  navigateMock.mockClear();
  localStorage.clear();
});

// Limpieza común después de cada test
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/* ==========================================================================
   1. Vista Perfil (perfil.jsx) - función cargarPerfil
   ========================================================================== */
describe("Vista Perfil - función cargarPerfil", () => {
  const usuarioMock = {
    id: 3,
    nombre: "Ana",
    apellido: "Pérez",
    correo: "ana@duoc.cl",
    rut: "12345678K",
    telefono: "912345678",
    region: "metropolitana",
    comuna: "Santiago",
  };

  const renderizar = () =>
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

  it("carga los datos del usuario guardado en localStorage y los muestra", async () => {
    localStorage.setItem("usuario", JSON.stringify({ id: 3 }));
    const fetchMock = vi.fn(() => responder({ ok: true, usuario: usuarioMock }));
    vi.stubGlobal("fetch", fetchMock);

    renderizar();

    // Espera a que aparezcan los datos traídos del backend
    expect(await screen.findByText("Ana")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/usuarios/3");
    expect(screen.getByText("Pérez")).toBeInTheDocument();
    expect(screen.getByText("ana@duoc.cl")).toBeInTheDocument();
    expect(screen.getByText("12345678K")).toBeInTheDocument();
    expect(screen.getByText("912345678")).toBeInTheDocument();
    expect(screen.getByText("metropolitana")).toBeInTheDocument();
    expect(screen.getByText("Santiago")).toBeInTheDocument();

    // Los botones apuntan a las rutas del usuario cargado
    expect(screen.getByRole("link", { name: "Editar Perfil" })).toHaveAttribute(
      "href",
      "/editarUsuario/3"
    );
    expect(
      screen.getByRole("link", { name: "Cambiar Contraseña" })
    ).toHaveAttribute("href", "/cambiarPsswd/3");
  });

  it("no consulta al backend ni muestra nada si no hay usuario guardado", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    renderizar();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByText("Mi Perfil")).not.toBeInTheDocument();
  });

  it("no muestra el perfil si el backend responde error", async () => {
    localStorage.setItem("usuario", JSON.stringify({ id: 3 }));
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(() => responder({ ok: false, error: "Usuario no encontrado" }))
    );

    renderizar();

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error al obtener perfil:",
        "Usuario no encontrado"
      );
    });
    expect(screen.queryByText("Mi Perfil")).not.toBeInTheDocument();
  });
});

/* ==========================================================================
   2. Vista CambiarPsswd (cambiarPsswd.jsx) - handleChange y handleCambiarClave
   ========================================================================== */
describe("Vista CambiarPsswd - handleChange y handleCambiarClave", () => {
  const renderizar = () =>
    render(
      <MemoryRouter initialEntries={["/cambiarPsswd/9"]}>
        <Routes>
          <Route path="/cambiarPsswd/:id" element={<CambiarPsswd />} />
        </Routes>
      </MemoryRouter>
    );

  const campos = () => ({
    actual: screen.getByPlaceholderText("Contraseña Actual"),
    nueva: screen.getByPlaceholderText("Nueva Contraseña"),
    confirmacion: screen.getByPlaceholderText("Confirmacion Nueva Contraseña"),
  });

  const completarFormulario = async (user, actual, nueva, confirmacion) => {
    const campo = campos();
    await user.type(campo.actual, actual);
    await user.type(campo.nueva, nueva);
    await user.type(campo.confirmacion, confirmacion);
  };

  const enviar = (user) =>
    user.click(screen.getByRole("button", { name: "Actualizar" }));

  it("handleChange: actualiza cada campo mientras se escribe", async () => {
    const user = userEvent.setup();

    renderizar();
    await completarFormulario(user, "vieja123", "nueva1234", "nueva1234");

    const { actual, nueva, confirmacion } = campos();
    expect(actual).toHaveValue("vieja123");
    expect(nueva).toHaveValue("nueva1234");
    expect(confirmacion).toHaveValue("nueva1234");
  });

  it("muestra un mensaje y no llama al backend si la confirmación no coincide", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderizar();
    await completarFormulario(user, "vieja123", "nueva1234", "otra12345");
    await enviar(user);

    expect(
      await screen.findByText("La confimacion no coincide con la nueva contraseña")
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envía el PUT correcto, muestra éxito y vuelve a /perfil", async () => {
    const fetchMock = vi.fn(() => responder({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderizar();
    await completarFormulario(user, "vieja123", "nueva1234", "nueva1234");
    await enviar(user);

    expect(
      await screen.findByText("Contraseña actualizada correctamente")
    ).toBeInTheDocument();

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/usuarios/9/cambiar-clave");
    expect(options.method).toBe("PUT");
    expect(JSON.parse(options.body)).toEqual({
      contrasenaActual: "vieja123",
      contrasenaNueva: "nueva1234",
    });

    // La redirección ocurre después de 1,5 segundos (setTimeout de la vista)
    expect(navigateMock).not.toHaveBeenCalled();
    await waitFor(
      () => {
        expect(navigateMock).toHaveBeenCalledWith("/perfil");
      },
      { timeout: 3000 }
    );
  });

  it("muestra el error del servidor y no redirige", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => responder({ ok: false, error: "Contraseña actual incorrecta" }))
    );
    const user = userEvent.setup();

    renderizar();
    await completarFormulario(user, "equivocada", "nueva1234", "nueva1234");
    await enviar(user);

    expect(
      await screen.findByText("Contraseña actual incorrecta")
    ).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("muestra un error si falla la conexión", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("sin conexión")))
    );
    const user = userEvent.setup();

    renderizar();
    await completarFormulario(user, "vieja123", "nueva1234", "nueva1234");
    await enviar(user);

    expect(await screen.findByText("Error")).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("no envía nada si el formulario está incompleto", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    renderizar();
    await enviar(user);

    expect(fetchMock).not.toHaveBeenCalled();
  });
});