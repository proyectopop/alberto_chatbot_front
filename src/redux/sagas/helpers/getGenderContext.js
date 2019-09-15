import contextos from '../../../constants/contextos';
import generos from '../../../constants/generos';

export default genderKey => (genderKey === generos[0].key
  ? contextos.generoMasculino
  : contextos.generoFemenino);
