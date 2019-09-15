import * as actions from '../actions/types';
import estado from '../../constants/estados';

const initialState = {
  estado: estado.conectando,
};

export default function (state = initialState, action) {

  switch (action.type) {

    case actions.ESTADO_ESTABLECER_ALBERTO_CONECTADO:
      return {
        ...state,
        estado: estado.conectado,
      };

    case actions.ESTADO_ESTABLECER_ALBERTO_DESCONECTADO:
      return {
        ...state,
        estado: estado.desconectado,
      };

    case actions.ESTADO_ESTABLECER_ALBERTO_ESCRIBIENDO:
      return {
        ...state,
        estado: estado.escribiendo,
      };

    case actions.ESTADO_ESTABLECER_ALBERTO_SE_CALENTO_Y_SE_FUE:
      return {
        ...state,
        estado: estado.caliente,
      };

    case actions.ESTADO_ESTABLECER_ALBERTO_PASEANDO_A_DYLAN:
      return {
        ...state,
        estado: estado.paseandoADylan,
      };


    default:
      return state;
  }
}
