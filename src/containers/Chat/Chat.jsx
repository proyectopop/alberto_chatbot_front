import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuidv4';
import { connect } from 'react-redux';
import { charlaUsuarieEnvioNuevoMensaje } from '../../redux/actions/charla';
import { generalEstablecerSessionId } from '../../redux/actions/general';
import Logo from '../../components/Logo/Logo';
import ChatBox from '../../components/ChatBox/ChatBox';
import Share from '../../components/Share/Share';
import SecondaryButton from '../../components/global/Buttons/SecondaryButton';

import './Chat.sass';

class Chat extends PureComponent {

  state = {
    mensajeUsuario: '',
    mostrarModalDeAyuda: false,
  }

  componentDidMount() {
    const { establecerSessionId } = this.props;

    establecerSessionId(uuid());
  }

  alternarMostrarModalDeAyuda = () => {
    this.setState({ mostrarModalDeAyuda: !this.state.mostrarModalDeAyuda });
  }

  manejarEscritura = (nuevoValor) => {
    this.setState({ mensajeUsuario: nuevoValor });
  }

  manejarUsuarieEnvioMensaje = () => {
    const { sesion, usuarieEnvioMensaje } = this.props;
    const { mensajeUsuario } = this.state;

    usuarieEnvioMensaje(sesion, mensajeUsuario);

    this.setState({ mensajeUsuario: '' });
  }

  ocultarEnMobileDuranteEscritura = () => {
    const { anchoDisponible, campoDeTextoEnfocado } = this.props;

    return anchoDisponible < 768 && campoDeTextoEnfocado;
  }


  render() {
    const { mensajeUsuario, mostrarModalDeAyuda } = this.state;
    const {
      anchoDisponible, charlaTerminada, estadoDeAlberto, historial,
    } = this.props;
    const { alternarMostrarModalDeAyuda, manejarEscritura, manejarUsuarieEnvioMensaje } = this;

    return (
      <section className="Chat fade">

        { anchoDisponible >= 769 && (
        <div className="Chat__Izquierda">
          <Logo tipo="logotipo" className="Chat__Izquierda__Logo" />
          <Share />
        </div>
        )}

        <div className="Chat__Derecha">
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
          { charlaTerminada && <SecondaryButton text="Continuar" style={{ marginBottom: '16px' }} />}
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
});

Chat.propTypes = {
  anchoDisponible: PropTypes.number.isRequired,
  campoDeTextoEnfocado: PropTypes.bool.isRequired,
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
