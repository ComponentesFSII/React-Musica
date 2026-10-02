const texto1 = "El mercado de hardware vuelve a enfrentar un periodo de incertidumbre.  Durante las últimas semanas, los precios de las tarjetas gráficas de la línea NVIDIA han experimentado un aumento drástico y acelerado en distribuidores globales, impulsado por una repentina escasez de componentes clave en la cadena de suministro."

const texto2 = "El debate entre Intel y AMD lleva décadas encendido, pero hoy la decisión es más táctica que nunca. La elección del procesador ideal depende directamente del uso principal del equipo, el presupuesto y los componentes que lo acompañarán en el ensamblado."

const contenedor1 = document.getElementById('contenedor-blog-1')
const contenedor2 = document.getElementById('contenedor-blog-2')

const parrafo1 = document.createElement("p")
const parrafo2 = document.createElement("p")

parrafo1.innerHTML = texto1
parrafo2.innerHTML = texto2

if (contenedor1 && parrafo1) contenedor1.appendChild(parrafo1);
if (contenedor2 && parrafo2) contenedor2.appendChild(parrafo2);

const texto4 = `La falta de disponibilidad de memorias VRAM de alta velocidad y de sustratos semiconductores ha creado un cuello de botella en las líneas de ensamblaje. Analistas del sector señalan que este desabastecimiento responde a un pico inesperado en la demanda de la industria de la inteligencia artificial, sumado a retrasos logísticos en las principales plantas de manufactura en Asia.
                Como consecuencia directa, modelos populares como las series RTX 30 y 40 han visto incrementos de precio de hasta un 40% respecto a su valor sugerido, afectando principalmente al consumidor final y al sector gaming. Los minoristas ya empiezan a racionar el stock disponible mientras el mercado espera una respuesta oficial por parte del fabricante para estabilizar la distribución durante los próximos meses.`                
 

const texto3 = `Para quienes priorizan la eficiencia energética y el rendimiento puramente enfocado en videojuegos, los procesadores AMD destacan gracias a su tecnología de memoria caché avanzada y a la longevidad de sus plataformas, lo que facilita actualizar componentes en el futuro sin necesidad de cambiar la tarjeta madre.
                Por otro lado, Intel mantiene una posición muy fuerte en cargas de trabajo híbridas y tareas profesionales como la edición de video o el renderizado. Su arquitectura de núcleos diferenciados para potencia y eficiencia ofrece una respuesta sólida en multitarea, además de brindar una excelente compatibilidad con software de producción y un gran valor en la gama media.
                La elección final responde a las prioridades de cada usuario. Mientras que AMD se consolida como la opción favorita para maximizar fotogramas con un consumo eléctrico ajustado, Intel continúa siendo una apuesta sumamente competitiva para creadores de contenido y entornos de trabajo pesado.`           

const contenedor3 = document.getElementById('parrafo-blog-1')
const contenedor4 = document.getElementById('parrafo-blog-2')

const parrafo3 = document.createElement("p")
const parrafo4 = document.createElement("p")


parrafo3.innerHTML = texto3
parrafo4.innerHTML = texto4

if (contenedor3 && parrafo3) contenedor3.appendChild(parrafo3);
if (contenedor4 && parrafo4) contenedor4.appendChild(parrafo4);