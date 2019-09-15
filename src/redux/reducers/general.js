import * as actions from '../actions/types';

const initialState = {
  charlaComenzada: false,
  charlaTerminada: false,
  servidorNoDisponible: false,
  consentimientoDeColaboracion: true,
  genero: 'I',
  sesion: '1',
};

export default function general(state = initialState, action) {

  switch (action.type) {

    case actions.GENERAL_MARCAR_CHARLA_COMENZADA:
      return {
        ...state,
        charlaComenzada: true,
      };

    case actions.GENERAL_ESTABLECER_SESSION_ID:
      return {
        ...state,
        sesion: action.payload,
      };

    case actions.GENERAL_MARCAR_CHARLA_TERMINADA:
      return {
        ...state,
        charlaTerminada: true,
      };

    case actions.GENERAL_SERVIDOR_NO_DISPONIBLE:
      return {
        ...state,
        servidorNoDisponible: true,
      };

    case actions.GENERAL_ALTERNAR_CONSENTIMIENTO_DE_COLABORACION:
      return {
        ...state,
        consentimientoDeColaboracion: !state.consentimientoDeColaboracion,
      };

    case actions.GENERAL_SELECCIONAR_GENERO:
      return {
        ...state,
        genero: action.payload,
      };

    default:
      return state;
  }

}
