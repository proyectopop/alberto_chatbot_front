import * as actions from '../actions/types';

const initialState = {
  ancho: 0,
  alto: 0,
  conectado: false,
  campoDeTextoEnfocado: false,
};

export default function cliente(state = initialState, action) {

  switch (action.type) {

    case actions.CLIENTE_MODIFICAR_ALTO_DISPONIBLE:
      return {
        ...state,
        alto: action.payload.alto,
      };

    case actions.CLIENTE_MODIFICAR_ANCHO_DISPONIBLE:
      return {
        ...state,
        ancho: action.payload.ancho,
      };


    default:
      return state;
  }
}
