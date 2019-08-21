import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-simple-popover';

import Logo from '../Logo/Logo';
import MainButton from '../global/Buttons/MainButton';
import Consent from '../Consent/Consent';
import Select from '../global/Select/Select';

import pregunta from '../../assets/img/pregunta.svg';

import './LandingSmallScreens.sass';

export default class LandingSmallScreens extends PureComponent {

  botonPrincipalSeleccionado = () => {

    const { establecerContextoDeGenero, marcarCharlaComenzada } = this.props;

    establecerContextoDeGenero();
    marcarCharlaComenzada();
  }

  render() {

    const {
      alternarConsentimiento, alternarMostrarPopover, contenidoDelPopoverDeGenero,
      consentimientoDeColaboracion, deberiaMostrarsePopoverDeGenero,
      estilosDelPopover, generos, seleccionarGenero,
    } = this.props;
    const { botonPrincipalSeleccionado } = this;

    return (
      <>

        <div className="slideshow">
          <div className="slideshow-fotos" />
        </div>

        <div className="LandingSmallScreenContent">

          <Logo tipo="logo" className="logo" />

          <MainButton
            clickHandler={botonPrincipalSeleccionado}
            text="Charlar con Alberto"
          />

          <div className="selectfield">
            <Popover
              placement="top"
              show={deberiaMostrarsePopoverDeGenero}
              target={this.genderPopoverTarget}
              style={estilosDelPopover}
            >
              {contenidoDelPopoverDeGenero()}
            </Popover>
            <img
              alt="Género: ayuda"
              className="SignoDePregunta"
              onClick={() => alternarMostrarPopover('genero', 'conTimeout')}
              ref={(node) => { this.genderPopoverTarget = node; }}
              src={pregunta}
            />
            <span className="GenderOptionsText">Tratarme según género </span>
            <Select options={generos} selectHandler={seleccionarGenero} />
          </div>

          <Consent
            alternarConsentimiento={alternarConsentimiento}
            consentimientoDeColaboracion={consentimientoDeColaboracion}
            opcionA="SI"
            opcionB="NO"
            texto="Enviar mis interacciones para mejorar el chatbot"
          />

        </div>

      </>
    );
  }
}


LandingSmallScreens.propTypes = {
  alternarConsentimiento: PropTypes.func.isRequired,
  alternarMostrarPopover: PropTypes.func.isRequired,
  consentimientoDeColaboracion: PropTypes.bool.isRequired,
  contenidoDelPopoverDeGenero: PropTypes.func.isRequired,
  deberiaMostrarsePopoverDeGenero: PropTypes.bool.isRequired,
  establecerContextoDeGenero: PropTypes.func.isRequired,
  generos: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  marcarCharlaComenzada: PropTypes.func.isRequired,
  estilosDelPopover: PropTypes.shape({
    borderRadius: PropTypes.string,
    fontSize: PropTypes.string,
    letterSpacing: PropTypes.string,
    lineHeight: PropTypes.number,
    padding: PropTypes.string,
  }).isRequired,
  seleccionarGenero: PropTypes.func.isRequired,
};
