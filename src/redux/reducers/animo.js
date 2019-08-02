import * as actions from '../actions/types';

const initialState = {
  animo: 3,
};

export default function animo(state = initialState, action) {

  switch (action.type) {

    case actions.ANIMO_INCREMENTAR:
      return {
        ...state,
        animo: state.animo + 1,
      };


    case actions.ANIMO_REDUCIR:
      return {
        ...state,
        animo: state.animo - 1,
      };

    default:
      return state;
  }
}
