import * as actions from '../actions/types';
import estado from '../../constants/estados';

const initialState = {
  estado: estado.desconectado,
};

export default function (state = initialState, action) {

  switch (action.type) {

    case actions.ESTAD0_ESTABLECER_ALBERTO_CONECTADO:
      return {
        ...state,
        estado: estado.conectado,
      };

    case actions.ESTAD0_ESTABLECER_ALBERTO_DESCONECTADO:
      return {
        ...state,
        estado: estado.desconectado,
      };

    case actions.ESTAD0_ESTABLECER_ALBERTO_ESCRIBIENDO:
      return {
        ...state,
        estado: estado.escribiendo,
      };


    default:
      return state;
  }
}
