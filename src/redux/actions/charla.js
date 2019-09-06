import * as types from './types';

export const charlaAgregarNuevoMensaje = (nuevoMensaje, autor) => ({
  type: types.CHARLA_AGREGAR_NUEVO_MENSAJE_AL_HISTORIAL,
  payload: { mensaje: nuevoMensaje, autorDelMensaje: autor },
});

export const charlaUsuarieEnvioNuevoMensaje = (sesionId, mensajeDelUsuarie) => ({
  type: types.CHARLA_USUARIE_ENVIO_MENSAJE,
  payload: { sesion: sesionId, mensaje: mensajeDelUsuarie },
});

export const charlaEstablecerContextoGeneroMasculino = () => ({
  type: types.CHARLA_ESTABLECER_CONTEXTO_GENERO_MASCULINO,
});

export const charlaEstablecerContextoGeneroFemenino = () => ({
  type: types.CHARLA_ESTABLECER_CONTEXTO_GENERO_FEMENINO,
});

export const charlaAgregarMensajeDeInactividadInicial = (msjId, mensajeDeAlberto) => ({
  type: types.CHARLA_AGREGAR_NUEVO_MENSAJE_DE_INACTIVIDAD_INICIAL_AL_HISTORIAL,
  payload: { id: msjId, mensaje: mensajeDeAlberto },
});

export const charlaAgregarMensajeDeInactividad = (msjId, mensajeDeAlberto) => ({
  type: types.CHARLA_AGREGAR_NUEVO_MENSAJE_DE_INACTIVIDAD_AL_HISTORIAL,
  payload: { id: msjId, mensaje: mensajeDeAlberto },
});
