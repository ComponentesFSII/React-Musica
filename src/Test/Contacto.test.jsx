import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contacto from "../Tienda/Contacto/contacto";

// Simula la respuesta del endpoint /api/comentario
const crearFetch = (ok, body) =>
  vi.fn(() => Promise.resolve({ ok, json: () => Promise.resolve(body) }));

const datosValidos = {
  correo: "ana@duoc.cl",
  nombre: "Ana",
  apellido: "Pérez",
  comentario: "Excelente atención",
};

// Los labels de la vista no están enlazados a los inputs (no tienen id),
// por eso los campos se buscan por su placeholder.
const campos = () => ({
  correo: screen.getByPlaceholderText("Correo Electronico"),
  nombre: screen.getByPlaceholderText("Nombre"),
  apellido: screen.getByPlaceholderText("Apellido"),
  comentario: screen.getByPlaceholderText("Contenido"),
});

const completarFormulario = async (user) => {
  const { correo, nombre, apellido, comentario } = campos();
  await user.type(correo, datosValidos.correo);
  await user.type(nombre, datosValidos.nombre);
  await user.type(apellido, datosValidos.apellido);
  await user.type(comentario, datosValidos.comentario);
};

const enviar = (user) =>
  user.click(screen.getByRole("button", { name: "Enviar Mensaje" }));

describe("Vista Contacto - handleChange y handleSubmit", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("handleChange: actualiza cada campo del formulario mientras se escribe", async () => {
    const user = userEvent.setup();

    render(<Contacto />);
    await completarFormulario(user);

    const { correo, nombre, apellido, comentario } = campos();
    expect(correo).toHaveValue(datosValidos.correo);
    expect(nombre).toHaveValue(datosValidos.nombre);
    expect(apellido).toHaveValue(datosValidos.apellido);
    expect(comentario).toHaveValue(datosValidos.comentario);
  });

  it("handleSubmit: envía los datos por POST, muestra éxito y limpia el formulario", async () => {
    const fetchMock = crearFetch(true, { ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<Contacto />);
    await completarFormulario(user);
    await enviar(user);

    // Mensaje de éxito por defecto, con estilo "success"
    const alerta = await screen.findByRole("alert");
    expect(alerta).toHaveTextContent("Comentario enviado con exito");
    expect(alerta).toHaveClass("alert-success");

    // Se llamó al backend con los datos escritos
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/comentario");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual(datosValidos);

    // El formulario quedó vacío
    const { correo, nombre, apellido, comentario } = campos();
    expect(correo).toHaveValue("");
    expect(nombre).toHaveValue("");
    expect(apellido).toHaveValue("");
    expect(comentario).toHaveValue("");
  });

  it("handleSubmit: muestra el mensaje que entrega el servidor cuando viene en la respuesta", async () => {
    vi.stubGlobal(
      "fetch",
      crearFetch(true, { ok: true, mensaje: "Gracias por escribirnos" })
    );
    const user = userEvent.setup();

    render(<Contacto />);
    await completarFormulario(user);
    await enviar(user);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Gracias por escribirnos"
    );
  });

  it("handleSubmit: muestra el error del servidor y conserva lo escrito", async () => {
    vi.stubGlobal(
      "fetch",
      crearFetch(false, { ok: false, error: "Correo no autorizado" })
    );
    const user = userEvent.setup();

    render(<Contacto />);
    await completarFormulario(user);
    await enviar(user);

    const alerta = await screen.findByRole("alert");
    expect(alerta).toHaveTextContent("Correo no autorizado");
    expect(alerta).toHaveClass("alert-danger");

    // El usuario no pierde lo que escribió
    expect(campos().comentario).toHaveValue(datosValidos.comentario);
  });

  it("handleSubmit: muestra un error si falla la conexión", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("sin conexión")))
    );
    const user = userEvent.setup();

    render(<Contacto />);
    await completarFormulario(user);
    await enviar(user);

    const alerta = await screen.findByRole("alert");
    expect(alerta).toHaveTextContent("Error el mensaje no pude ser enviado");
    expect(alerta).toHaveClass("alert-danger");
  });

  it("no envía nada si el formulario está incompleto", async () => {
    const fetchMock = crearFetch(true, { ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<Contacto />);
    await enviar(user);

    expect(fetchMock).not.toHaveBeenCalled();
  });
});