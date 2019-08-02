import { combineReducers } from 'redux';
import animo from './animo';
import cliente from './cliente';
import charla from './charla';
import estado from './estado';
import general from './general';

const rootReducer = combineReducers({
  animo,
  cliente,
  charla,
  estado,
  general,
});

export default rootReducer;
