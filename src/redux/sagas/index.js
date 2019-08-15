import {
  all, delay, takeEvery, put, select,
} from 'redux-saga/effects';
import uuid from 'uuidv4';
import generos from '../../constants/generos';
import simularDelay from './helpers/delay';
import contextoDeGenero from './helpers/getGenderContext';
import * as actions from '../actions/types';
import * as api from '../../api/api';

// TODO --> ERROR HANDLING EN SAGAS

function* inicializarChat() {

  const estaConectado = yield api.probarSiHayConexion();

  if (estaConectado) {

    yield put({
      type: actions.ESTAD0_ESTABLECER_ALBERTO_CONECTADO,
    });

    // Chequear genero
    const generoSeleccionado = yield select(state => state.general.genero);

    // Si el usuarie quiere ser tratado como hombre o mujer, establecer contexto en DialogFlow
    if (generoSeleccionado !== generos[0].key) {
      const sessionId = yield select(state => state.general.sesion);

      yield api.establecerContexto(sessionId, { event: contextoDeGenero(generoSeleccionado) });
    }
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


// Watcher Sagas

export function* usuarieEntroAlChat() {
  yield takeEvery(actions.GENERAL_MARCAR_CHARLA_COMENZADA, inicializarChat);
}

export function* usarieEnvioMensaje() {
  yield takeEvery(actions.CHARLA_USUARIE_ENVIO_MENSAJE, procesarMensajeDeUsuarie);
}

export default function* rootSaga() {
  yield all([
    usuarieEntroAlChat(),
    usarieEnvioMensaje(),
  ]);
}
