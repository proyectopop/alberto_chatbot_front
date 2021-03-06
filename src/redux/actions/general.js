import * as types from './types';

export const generalAlternarConsentimiento = () => ({
  type: types.GENERAL_ALTERNAR_CONSENTIMIENTO_DE_COLABORACION,
});

export const generalServidorNoDisponible = () => ({
  type: types.GENERAL_SERVIDOR_NO_DISPONIBLE,
});

export const generalEstablecerSessionId = uuid => ({
  type: types.GENERAL_ESTABLECER_SESSION_ID,
  payload: uuid,
});

export const generalCharlaComenzada = () => ({
  type: types.GENERAL_MARCAR_CHARLA_COMENZADA,
});

export const generalCharlaTerminada = () => ({
  type: types.GENERAL_MARCAR_CHARLA_TERMINADA,
});

export const generalSeleccionarGenero = generoSeleccionado => ({
  type: types.GENERAL_SELECCIONAR_GENERO,
  payload: generoSeleccionado,
});
