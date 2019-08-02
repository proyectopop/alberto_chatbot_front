import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListaDeGeneros from '../../constants/generos';
import {
  generalAlternarConsentimiento, generalCharlaComenzada,
  generalCharlaTerminada, generalSeleccionarGenero,
} from '../../redux/actions/general';
import { charlEstablecerContextoGeneroFemenino, charlaEstablecerContextoGeneroMasculino } from '../../redux/actions/charla';

import LandingLarge from '../../components/LandingLargeScreens/LandingLargeScreens';
import LandingSmall from '../../components/LandingSmallScreens/LandingSmallScreens';


import './Landing.sass';

class Landing extends Component {

   establecerContextoDeGenero = () => {
     const { genero, establecerContextoGeneroMasculino, establecerContextoGeneroFemenino } = this.props;

     if (genero === 'M') return establecerContextoGeneroMasculino();
     if (genero === 'F') return establecerContextoGeneroFemenino();

     return null;
   }

   render() {

     const {
       anchoDisponible, alternarConsentimiento, consentimientoDeColaboracion,
       marcarCharlaComenzada, seleccionarGenero,
     } = this.props;
     const { establecerContextoDeGenero } = this;

     return (
       <section id="Landing">
         {anchoDisponible > 768 ? (
           <LandingLarge
             alternarConsentimiento={alternarConsentimiento}
             consentimientoDeColaboracion={consentimientoDeColaboracion}
             establecerContextoDeGenero={establecerContextoDeGenero}
             generos={ListaDeGeneros}
             marcarCharlaComenzada={marcarCharlaComenzada}
             seleccionarGenero={seleccionarGenero}
           />
         ) : (
           <LandingSmall
             alternarConsentimiento={alternarConsentimiento}
             consentimientoDeColaboracion={consentimientoDeColaboracion}
             establecerContextoDeGenero={establecerContextoDeGenero}
             generos={ListaDeGeneros}
             marcarCharlaComenzada={marcarCharlaComenzada}
             seleccionarGenero={seleccionarGenero}
           />
         )}
       </section>
     );
   }
}

const mapStateToProps = state => ({
  charlaComenzada: state.general.charlaComenzada,
  charlaTerminada: state.general.charlaTerminada,
  genero: state.general.genero,
  consentimientoDeColaboracion: state.general.consentimientoDeColaboracion,
  historial: state.charla.historial,
});


const mapDispatchToProps = dispatch => ({
  alternarConsentimiento: () => dispatch(generalAlternarConsentimiento()),
  establecerContextoGeneroFemenino: () => dispatch(charlEstablecerContextoGeneroFemenino()),
  establecerContextoGeneroMasculino: () => dispatch(charlaEstablecerContextoGeneroMasculino()),
  seleccionarGenero: generoSeleccionado => dispatch(generalSeleccionarGenero(generoSeleccionado)),
  marcarCharlaComenzada: () => dispatch(generalCharlaComenzada()),
  marcarCharlaTerminada: () => dispatch(generalCharlaTerminada()),
});

Landing.propTypes = {
  anchoDisponible: PropTypes.number.isRequired,
  alternarConsentimiento: PropTypes.func.isRequired,
  consentimientoDeColaboracion: PropTypes.bool.isRequired,
  establecerContextoGeneroFemenino: PropTypes.func.isRequired,
  establecerContextoGeneroMasculino: PropTypes.func.isRequired,
  genero: PropTypes.string.isRequired,
  marcarCharlaComenzada: PropTypes.func.isRequired,
  seleccionarGenero: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Landing);
