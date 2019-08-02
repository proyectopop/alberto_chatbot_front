import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuidv4';
import { connect } from 'react-redux';
import { charlaUsuarieEnvioNuevoMensaje } from '../../redux/actions/charla';
import { generalEstablecerSessionId } from '../../redux/actions/general';
import Logo from '../../components/Logo/Logo';
import ChatBox from '../../components/ChatBox/ChatBox';
import Share from '../../components/Share/Share';

import './Chat.sass';

class Chat extends PureComponent {

  state = {
    mensajeUsuario: '',
  }

  componentDidMount() {
    const { establecerSessionId } = this.props;

    establecerSessionId(uuid());
  }

  manejarEscritura = (nuevoValor) => {
    this.setState({ mensajeUsuario: nuevoValor });
  }

  manejarUsuarieEnvioMensaje = () => {
    const { usuarieEnvioMensaje } = this.props;
    const { mensajeUsuario } = this.state;

    usuarieEnvioMensaje(mensajeUsuario);

    this.setState({ mensajeUsuario: '' });
  }

  ocultarEnMobileDuranteEscritura = () => {
    const { anchoDisponible, campoDeTextoEnfocado } = this.props;

    return anchoDisponible < 768 && campoDeTextoEnfocado;
  }


  render() {
    const { mensajeUsuario } = this.state;
    const {
      anchoDisponible, estadoDeAlberto, historial,
    } = this.props;

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
            estadoDeAlberto={estadoDeAlberto}
            historial={historial}
            mensaje={mensajeUsuario}
            manejarEscritura={this.manejarEscritura}
            procesarMensajeUsuario={this.manejarUsuarieEnvioMensaje}
          />
        </div>


      </section>
    );
  }
}


const mapStateToProps = state => ({
  campoDeTextoEnfocado: state.cliente.campoDeTextoEnfocado,
  historial: state.charla.historial,
  estadoDeAlberto: state.estado.estado,
});

const mapDispatchToProps = dispatch => ({
  usuarieEnvioMensaje: mensaje => dispatch(charlaUsuarieEnvioNuevoMensaje(mensaje)),
  establecerSessionId: id => dispatch(generalEstablecerSessionId(id)),
});

Chat.propTypes = {
  anchoDisponible: PropTypes.number.isRequired,
  campoDeTextoEnfocado: PropTypes.bool.isRequired,
  establecerSessionId: PropTypes.func.isRequired,
  estadoDeAlberto: PropTypes.string.isRequired,
  historial: PropTypes.arrayOf(PropTypes.object).isRequired,
  usuarieEnvioMensaje: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
