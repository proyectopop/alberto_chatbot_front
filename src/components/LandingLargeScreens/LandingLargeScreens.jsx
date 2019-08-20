import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Loading from '../global/Loading/Loading';
import MainButton from '../global/Buttons/MainButton';
import Consent from '../Consent/Consent';
import Select from '../global/Select/Select';
import Logo from '../Logo/Logo';

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
      alternarConsentimiento, consentimientoDeColaboracion,
      generos, seleccionarGenero,
    } = this.props;
    const { shouldShow, triggerAnimations } = this.state;
    const { botonPrincipalSeleccionado } = this;

    return (
      <>

        {
          shouldShow ? (
            <div className="MainLogoAndCallToActionWrapper">

              <Logo tipo="logo" />

              <MainButton
                clickHandler={botonPrincipalSeleccionado}
                text="Charlar con Alberto"
              />

              <div className="LandingOptions">

                <div className="selectfield">
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
  consentimientoDeColaboracion: PropTypes.bool.isRequired,
  establecerContextoDeGenero: PropTypes.func.isRequired,
  generos: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  marcarCharlaComenzada: PropTypes.func.isRequired,
  seleccionarGenero: PropTypes.func.isRequired,
};
