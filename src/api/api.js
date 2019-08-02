import { API_BASE_URL, API_HEADERS } from '../config';

export async function probarSiHayConexion() {
  const respuesta = await fetch(`${API_BASE_URL}/alberto/prueba`, { ...API_HEADERS }).then(res => res);

  return respuesta;
}

export async function procesarMensaje(session = 1, text = '') {

  const mensajeCodificadoEnJson = JSON.stringify({ session, text });

  const [respuesta] = await fetch(`${API_BASE_URL}/alberto/mensaje`, {
    ...API_HEADERS,
    method: 'POST',
    body: mensajeCodificadoEnJson,
  }).then(res => res.json());

  return respuesta;
}

export async function establecerContexto(contexto = {}) {

  const contextoCodificadoEnJson = JSON.stringify(contexto);

  const [respuesta] = await fetch(`${API_BASE_URL}/alberto/evento`, {
    ...API_HEADERS,
    method: 'POST',
    body: contextoCodificadoEnJson,
  }).then(res => res.json());

  return respuesta;

}
