import { API_BASE_URL, API_HEADERS } from '../config';

export async function probarSiHayConexion() {

  let respuesta;

  try {
    respuesta = await fetch(`${API_BASE_URL}/alberto/prueba`, { ...API_HEADERS });
  } catch {
    respuesta = false;
  }

  return respuesta;
}

export async function procesarMensaje(sessionId = 1, text = '') {

  const mensajeCodificadoEnJson = JSON.stringify({ sessionId, text });

  const [respuesta] = await fetch(`${API_BASE_URL}/alberto/mensaje`, {
    ...API_HEADERS,
    method: 'POST',
    body: mensajeCodificadoEnJson,
  }).then(res => res.json());

  return respuesta;
}

export async function establecerContexto(sessionId = 1, contexto = {}) {

  const contextoCodificadoEnJson = JSON.stringify({ sessionId, ...contexto });

  const [respuesta] = await fetch(`${API_BASE_URL}/alberto/evento`, {
    ...API_HEADERS,
    method: 'POST',
    body: contextoCodificadoEnJson,
  }).then(res => res.json());

  return respuesta;

}

export async function chequearSiHayImagenAdjunta(frase = '') {

  const fraseCodificadaEnJson = JSON.stringify({ frase });

  const respuesta = await fetch(`${API_BASE_URL}/alberto/imagenes`, {
    ...API_HEADERS,
    method: 'POST',
    body: fraseCodificadaEnJson,
  })
    .then(res => res.json());

  return respuesta;

}
