import {
  all, delay, takeEvery, put,
} from 'redux-saga/effects';
import uuid from 'uuidv4';
import contextos from '../../constants/contextos';
import simularDelay from './helpers/delay';
import * as actions from '../actions/types';
import * as api from '../../api/api';

// TODO --> ERROR HANDLING EN SAGAS

function* esperarPorConexion() {

  const estaConectado = yield api.probarSiHayConexion();

  if (estaConectado) {
    yield put({
      type: actions.ESTAD0_ESTABLECER_ALBERTO_CONECTADO,
    });
  }

}


function* procesarMensajeDeUsuarie(action) {

  if (!action.payload.mensaje) return;

  yield put({
    type: actions.ESTAD0_ESTABLECER_ALBERTO_ESCRIBIENDO,
  });

  const { sesion } = action.payload;
  const mensaje = action.payload.mensaje.trim();

  yield put({
    type: actions.CHARLA_AGREGAR_NUEVO_MENSAJE_AL_HISTORIAL,
    payload: {
      autorDelMensaje: 'Yo',
      mensaje: {
        id: uuid(),
        texto: mensaje,
      },
    },
  });

  const respuesta = yield api.procesarMensaje(sesion, mensaje);


  // Simular delay
  const resultadoDeSimulacion = simularDelay(respuesta.queryResult.fulfillmentText);
  yield delay(resultadoDeSimulacion);

  // Chequear si tiene imágen adjunta

  const imagenAdjunta = yield api.chequearSiHayImagenAdjunta(respuesta.queryResult.fulfillmentText);
  console.log(imagenAdjunta.src);
  yield put({
    type: actions.CHARLA_AGREGAR_NUEVO_MENSAJE_AL_HISTORIAL,
    payload: {
      autorDelMensaje: 'Alberto',
      mensaje: {
        id: respuesta.responseId,
        texto: respuesta.queryResult.fulfillmentText,
        imagenAdjunta: imagenAdjunta && imagenAdjunta.src,
      },
    },
  });

  yield put({
    type: actions.ESTAD0_ESTABLECER_ALBERTO_CONECTADO,
  });
}

function* enviarEvento(nombreDeEvento) {
  return yield api.establecerContexto({ event: nombreDeEvento });
}


// Watcher Sagas

export function* usuarieEntroAlChat() {
  yield takeEvery(actions.GENERAL_MARCAR_CHARLA_COMENZADA, esperarPorConexion);
}

export function* usarieEnvioMensaje() {
  yield takeEvery(actions.CHARLA_USUARIE_ENVIO_MENSAJE, procesarMensajeDeUsuarie);
}

export function* establecerGeneroFemenino() {
  yield takeEvery(actions.CHARLA_ESTABLECER_CONTEXTO_GENERO_FEMENINO,
    () => enviarEvento(contextos.generoFemenino));
}

export function* establecerGeneroMasculino() {
  yield takeEvery(actions.CHARLA_ESTABLECER_CONTEXTO_GENERO_MASCULINO,
    () => enviarEvento(contextos.generoMasculino));
}

export default function* rootSaga() {
  yield all([
    usarieEnvioMensaje(),
    usuarieEntroAlChat(),
    establecerGeneroFemenino(),
    establecerGeneroMasculino(),
  ]);
}
