import * as actions from '../actions/types';

const initialState = {
  historial: [],
};

export default function charla(state = initialState, action) {

  switch (action.type) {

    case actions.CHARLA_AGREGAR_NUEVO_MENSAJE_AL_HISTORIAL: {
      return {
        ...state,
        historial: [...state.historial,
          {
            autor: action.payload.autorDelMensaje,
            mensaje: {
              id: action.payload.mensaje.id,
              texto: action.payload.mensaje.texto,
              imagenAdjunta: action.payload.mensaje.imagenAdjunta,
            },
          },
        ],
      };
    }

    case actions.CHARLA_AGREGAR_NUEVO_MENSAJE_DE_INACTIVIDAD_INICIAL_AL_HISTORIAL: {
      return {
        ...state,
        historial: [...state.historial,
          {
            autor: 'Alberto',
            mensaje: {
              id: action.payload.id,
              texto: action.payload.mensaje,
            },
          },
        ],
      };
    }

    case actions.CHARLA_AGREGAR_NUEVO_MENSAJE_DE_INACTIVIDAD_AL_HISTORIAL: {
      return {
        ...state,
        historial: [...state.historial,
          {
            autor: 'Alberto',
            mensaje: {
              id: action.payload.id,
              texto: action.payload.mensaje,
            },
          },
        ],
      };
    }

    case actions.CHARLA_ESTABLECER_CONTEXTO_GENERO_FEMENINO: {
      return state;
    }

    case actions.CHARLA_ESTABLECER_CONTEXTO_GENERO_MASCULINO: {
      return state;
    }

    default:
      return state;
  }

}
