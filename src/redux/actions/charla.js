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

export const charlEstablecerContextoGeneroFemenino = () => ({
  type: types.CHARLA_ESTABLECER_CONTEXTO_GENERO_FEMENINO,
});
