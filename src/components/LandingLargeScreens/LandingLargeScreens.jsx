import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-simple-popover';
import { CSSTransition } from 'react-transition-group';

import Loading from '../global/Loading/Loading';
import MainButton from '../global/Buttons/MainButton';
import Consent from '../Consent/Consent';
import Select from '../global/Select/Select';
import Logo from '../Logo/Logo';

import pregunta from '../../assets/img/pregunta.svg';
import argentinos from '../../assets/img/argentinos.png';
import bigoteRockero from '../../assets/img/bigoterockero.png';
import dylan from '../../assets/img/dylan.png';
import laviola from '../../assets/img/laviola.png';

import './LandingLargeScreens.sass';

export default class LandingLargeScreens extends Component {

  state = {
    shouldShow: false,
    aImageLoaded: false,
    bImageLoaded: false,
    cImageLoaded: false,
    dImageLoaded: false,
    triggerAnimations: false,
  };

  botonPrincipalSeleccionado = () => {

    const { establecerContextoDeGenero, marcarCharlaComenzada } = this.props;

    establecerContextoDeGenero();
    marcarCharlaComenzada();
  }


  imageLoadedHandler = (image) => {
    switch (image) {
      case 'a':
        this.setState({ aImageLoaded: true }, () => this.checkIfAllImagesAreLoaded());
        break;
      case 'b':
        this.setState({ bImageLoaded: true }, () => this.checkIfAllImagesAreLoaded());
        break;
      case 'c':
        this.setState({ cImageLoaded: true }, () => this.checkIfAllImagesAreLoaded());
        break;
      default:
        this.setState({ dImageLoaded: true }, () => this.checkIfAllImagesAreLoaded());
        break;
    }
  };

  imagesLoadedHandler = () => this.setState({ shouldShow: true }, () => {
    this.setState({ triggerAnimations: true });
  });

  checkIfAllImagesAreLoaded = () => {
    const {
      aImageLoaded, bImageLoaded, cImageLoaded, dImageLoaded,
    } = this.state;

    if (aImageLoaded && bImageLoaded && cImageLoaded && dImageLoaded) {
      this.imagesLoadedHandler();
    }
  };

  render() {
    const {
      alternarConsentimiento, alternarMostrarPopover, consentimientoDeColaboracion,
      contenidoDelPopoverDeGenero, deberiaMostrarsePopoverDeGenero,
      estilosDelPopover, generos, seleccionarGenero,
    } = this.props;
    const { shouldShow, triggerAnimations } = this.state;
    const { botonPrincipalSeleccionado } = this;

    return (
      <>

        {
          shouldShow ? (
            <div className="MainLogoAndCallToActionWrapper">

              <Logo tipo="logo" />

              <div className="LandingOptions">

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
                    onMouseEnter={() => alternarMostrarPopover('genero')}
                    onMouseLeave={() => alternarMostrarPopover('genero')}
                    ref={(node) => { this.genderPopoverTarget = node; }}
                    src={pregunta}
                  />
                  <span className="GenderOptionsText">El chatbot debe tratarme según género </span>
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

              <MainButton
                clickHandler={botonPrincipalSeleccionado}
                text="Charlar con Alberto"
              />


            </div>
          ) : <Loading />
        }


        {!shouldShow ? (
          <div
            style={{
              position: 'absolute',
              left: '-2000px',
              visibility: 'hidden',
            }}
          >
            <Logo tipo="logo" />
            <img
              src={argentinos}
              alt="Argentinos Juniors"
              className="foto-a"
              onLoad={() => this.imageLoadedHandler('a')}
            />
            <img
              src={bigoteRockero}
              className="foto-b"
              alt="Alberto con Lito Nebbia"
              onLoad={() => this.imageLoadedHandler('b')}
            />
            <img
              src={dylan}
              className="foto-c"
              alt="Dylan, el perrito de Alberto"
              onLoad={() => this.imageLoadedHandler('c')}
            />
            <img
              src={laviola}
              className="foto-d"
              alt="Alberto tocando la guitarra"
              onLoad={() => this.imageLoadedHandler('d')}
            />
          </div>
        ) : (
          <>
            <CSSTransition
              in={triggerAnimations}
              classNames="foto-a"
              timeout={1800}
            >
              <img
                src={argentinos}
                alt="Argentinos Juniors"
                className="foto-a"
              />
            </CSSTransition>
            <CSSTransition
              in={triggerAnimations}
              classNames="foto-b"
              timeout={1400}
            >
              <img
                src={bigoteRockero}
                className="foto-b"
                alt="Alberto con Lito Nebbia"
              />
            </CSSTransition>
            <CSSTransition
              in={triggerAnimations}
              classNames="foto-c"
              timeout={1000}
            >
              <img
                src={dylan}
                className="foto-c"
                alt="Dylan, el perrito de Alberto"
              />
            </CSSTransition>
            <CSSTransition
              in={triggerAnimations}
              classNames="foto-d"
              timeout={2000}
            >
              <img
                src={laviola}
                className="foto-d"
                alt="Alberto tocando la guitarra"
              />
            </CSSTransition>
          </>
        )}
      </>
    );
  }
}

LandingLargeScreens.propTypes = {
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
