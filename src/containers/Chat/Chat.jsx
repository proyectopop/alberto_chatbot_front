/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuidv4';
import { connect } from 'react-redux';
import { mensajesDeInactividad, mensajesDeInactividadInicial } from '../../constants/mensajesDeInactividad';
import {
  charlaUsuarieEnvioNuevoMensaje,
  charlaAgregarMensajeDeInactividad,
  charlaAgregarMensajeDeInactividadInicial,
} from '../../redux/actions/charla';
import { generalEstablecerSessionId } from '../../redux/actions/general';
import About from '../../components/About/About';
import Logo from '../../components/Logo/Logo';
import ChatBox from '../../components/ChatBox/ChatBox';
import Share from '../../components/Share/Share';
import SecondaryButton from '../../components/global/Buttons/SecondaryButton';

import './Chat.sass';

class Chat extends PureComponent {

  state = {
    mensajeUsuario: '',
    mostrarModalDeAyuda: false,
    mostrarSobreNostros: false,
  }

  componentDidMount() {
    const { establecerSessionId, enviarMensajeDeInactividadInicial } = this.props;

    establecerSessionId(uuid());
    setTimeout(() => enviarMensajeDeInactividadInicial(uuid(), this.mensajeDeInactividadInicial()), 20000);
  }

  mensajeDeInactividadInicial = () => {
    const mensajeAleatorio = Math.floor(Math.random() * mensajesDeInactividadInicial.length);
    return mensajesDeInactividadInicial[mensajeAleatorio];
  }

  mensajeDeInactividad = () => {
    const mensajeAleatorio = Math.floor(Math.random() * mensajesDeInactividad.length);
    return mensajesDeInactividad[mensajeAleatorio];
  }

  alternarMostrarModalDeAyuda = () => {
    const { mostrarModalDeAyuda } = this.state;

    this.setState({ mostrarModalDeAyuda: !mostrarModalDeAyuda });
  }

  manejarEscritura = (nuevoValor) => {
    this.setState({ mensajeUsuario: nuevoValor });
  }

  manejarUsuarieEnvioMensaje = () => {
    const { sesion, usuarieEnvioMensaje, enviarMensajeDeInactividad } = this.props;
    const { mensajeUsuario } = this.state;

    usuarieEnvioMensaje(sesion, mensajeUsuario);

    this.setState({ mensajeUsuario: '' });
    setTimeout(() => enviarMensajeDeInactividad(uuid(), this.mensajeDeInactividad()), 10000);

  }

  ocultarEnMobileDuranteEscritura = () => {
    const { anchoDisponible, campoDeTextoEnfocado } = this.props;

    return anchoDisponible < 768 && campoDeTextoEnfocado;
  }

  alternarMostrarSobreNosotros = () => {
    const { mostrarSobreNostros } = this.state;

    this.setState({
      mostrarSobreNostros: !mostrarSobreNostros,
    });
  }


  render() {
    const { mensajeUsuario, mostrarModalDeAyuda, mostrarSobreNostros } = this.state;
    const {
      anchoDisponible, charlaTerminada, estadoDeAlberto, historial,
    } = this.props;
    const {
      alternarMostrarSobreNosotros, alternarMostrarModalDeAyuda, manejarEscritura, manejarUsuarieEnvioMensaje,
    } = this;

    return (
      <section className="Chat fade">

        { anchoDisponible >= 769 && (
        <div className="Chat__Izquierda">
          <Logo tipo="logotipo" className="Chat__Izquierda__Logo" />
          <Share />
        </div>
        )}

        <div className="Chat__Derecha">
          {
            mostrarSobreNostros ? <About /> : (
              <ChatBox
                alternarMostrarModalDeAyuda={alternarMostrarModalDeAyuda}
                charlaTerminada={charlaTerminada}
                estadoDeAlberto={estadoDeAlberto}
                historial={historial}
                mensaje={mensajeUsuario}
                manejarEscritura={manejarEscritura}
                mostrarModalDeAyuda={mostrarModalDeAyuda}
                procesarMensajeUsuario={manejarUsuarieEnvioMensaje}
              />
            )
          }
          { charlaTerminada && (
          <SecondaryButton
            text={mostrarSobreNostros ? 'Reiniciar' : 'Continuar'}
            style={{ marginBottom: '16px' }}
            clickHandler={alternarMostrarSobreNosotros}
          />
          )}
        </div>


      </section>
    );
  }
}


const mapStateToProps = state => ({
  campoDeTextoEnfocado: state.cliente.campoDeTextoEnfocado,
  charlaTerminada: state.general.charlaTerminada,
  historial: state.charla.historial,
  estadoDeAlberto: state.estado.estado,
  sesion: state.general.sesion,
});

const mapDispatchToProps = dispatch => ({
  usuarieEnvioMensaje: (sesion, msj) => dispatch(charlaUsuarieEnvioNuevoMensaje(sesion, msj)),
  establecerSessionId: id => dispatch(generalEstablecerSessionId(id)),
  enviarMensajeDeInactividad: (msjId, msj) => dispatch(charlaAgregarMensajeDeInactividad(msjId, msj)),
  enviarMensajeDeInactividadInicial: (msjId, msj) => dispatch(charlaAgregarMensajeDeInactividadInicial(msjId, msj)),
});

Chat.propTypes = {
  anchoDisponible: PropTypes.number.isRequired,
  campoDeTextoEnfocado: PropTypes.bool.isRequired,
  enviarMensajeDeInactividad: PropTypes.func.isRequired,
  enviarMensajeDeInactividadInicial: PropTypes.func.isRequired,
  establecerSessionId: PropTypes.func.isRequired,
  estadoDeAlberto: PropTypes.string.isRequired,
  charlaTerminada: PropTypes.bool,
  historial: PropTypes.arrayOf(PropTypes.object).isRequired,
  sesion: PropTypes.string.isRequired,
  usuarieEnvioMensaje: PropTypes.func.isRequired,
};

Chat.defaultProps = {
  charlaTerminada: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
