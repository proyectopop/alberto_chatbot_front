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

  state = {
    deberiaMostrarsePopoverDeGenero: false,
  }

   estilosDelPopover = {
     borderRadius: '6px',
     fontSize: '1.1rem',
     letterSpacing: '0.5px',
     lineHeight: 1.5,
     padding: '10px',
   }

   alternarMostrarPopover= (popoverParaAlternar, conTimeOut) => {
     const { deberiaMostrarsePopoverDeGenero } = this.state;

     if (popoverParaAlternar === 'genero') {

       this.setState({ deberiaMostrarsePopoverDeGenero: !deberiaMostrarsePopoverDeGenero });

       return conTimeOut
     && setTimeout(() => this.setState({ deberiaMostrarsePopoverDeGenero: false }), 5000);
     }

     return 'Nada, por ahora';
   }


   contenidoDelPopoverDeGenero = () => (
     <p>
    El bot tiene en cuenta el género a la hora de responderte.<br />
    Por ej., si lo hacés enojar, las respuestas serán más suaves
    si elegís <i>femenino</i> o <i>indistinto</i>.
     </p>
   )


   establecerContextoDeGenero = () => {
     const {
       genero, establecerContextoGeneroMasculino,
       establecerContextoGeneroFemenino,
     } = this.props;

     if (genero === 'M') return establecerContextoGeneroMasculino();
     if (genero === 'F') return establecerContextoGeneroFemenino();

     return null;
   }


   render() {

     const {
       anchoDisponible, alternarConsentimiento, consentimientoDeColaboracion,
       marcarCharlaComenzada, seleccionarGenero,
     } = this.props;
     const {
       alternarMostrarPopover, contenidoDelPopoverDeGenero,
       establecerContextoDeGenero, estilosDelPopover,
     } = this;
     const { deberiaMostrarsePopoverDeGenero } = this.state;

     return (
       <section id="Landing">
         {anchoDisponible > 768 ? (
           <LandingLarge
             alternarConsentimiento={alternarConsentimiento}
             alternarMostrarPopover={alternarMostrarPopover}
             consentimientoDeColaboracion={consentimientoDeColaboracion}
             contenidoDelPopoverDeGenero={contenidoDelPopoverDeGenero}
             deberiaMostrarsePopoverDeGenero={deberiaMostrarsePopoverDeGenero}
             establecerContextoDeGenero={establecerContextoDeGenero}
             generos={ListaDeGeneros}
             marcarCharlaComenzada={marcarCharlaComenzada}
             estilosDelPopover={estilosDelPopover}
             seleccionarGenero={seleccionarGenero}
           />
         ) : (
           <LandingSmall
             alternarConsentimiento={alternarConsentimiento}
             alternarMostrarPopover={alternarMostrarPopover}
             consentimientoDeColaboracion={consentimientoDeColaboracion}
             contenidoDelPopoverDeGenero={contenidoDelPopoverDeGenero}
             deberiaMostrarsePopoverDeGenero={deberiaMostrarsePopoverDeGenero}
             establecerContextoDeGenero={establecerContextoDeGenero}
             generos={ListaDeGeneros}
             marcarCharlaComenzada={marcarCharlaComenzada}
             estilosDelPopover={estilosDelPopover}
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
