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
import estado from '../../constants/estados';
import { generalEstablecerSessionId } from '../../redux/actions/general';
import About from '../../components/About/About';
import Logo from '../../components/Logo/Logo';
import ChatBox from '../../components/ChatBox/ChatBox';
import Share from '../../components/Share/Share';
import SecondaryButton from '../../components/global/Buttons/SecondaryButton';
import termometro from '../../assets/img/termometro.svg';
import serverDown from '../../assets/img/server-down.png';

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
    this.timeoutDeActividadInicial = setTimeout(() => enviarMensajeDeInactividadInicial(uuid(),
      this.mensajeDeInactividadInicial()), 20000);
  }

  componentDidUpdate = (prevProps) => {
    const { charlaTerminada, enviarMensajeDeInactividad, historial } = this.props;
    const historialAnterior = prevProps.historial.length;
    const historialActual = historial.length;

    if (historialActual !== historialAnterior) {
      // cancelar inactividad
      clearTimeout(this.timeoutDeInactividad);
      this.timeoutDeInactividad = setTimeout(() => enviarMensajeDeInactividad(uuid(),
        this.mensajeDeInactividad()), 35000);
    }

    if (charlaTerminada) {
      clearTimeout(this.timeoutDeActividadInicial);
      clearTimeout(this.timeoutDeInactividad);
    }
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
    const { sesion, usuarieEnvioMensaje } = this.props;
    const { mensajeUsuario } = this.state;

    usuarieEnvioMensaje(sesion, mensajeUsuario);

    this.setState({ mensajeUsuario: '' });
    clearTimeout(this.timeoutDeActividadInicial);
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

  manejarClick = () => {
    const { alternarMostrarSobreNosotros } = this;
    const { mostrarSobreNostros } = this.state;

    return mostrarSobreNostros ? window.location.reload() : alternarMostrarSobreNosotros();
  }

   charlaEstaTerminada = () => {
     const { charlaTerminada, servidorNoDisponible, estadoDeAlberto } = this.props;
     return charlaTerminada && !(servidorNoDisponible) && (estadoDeAlberto === estado.caliente);
   }

   render() {
     const { mensajeUsuario, mostrarModalDeAyuda, mostrarSobreNostros } = this.state;
     const {
       anchoDisponible, charlaTerminada, estadoDeAlberto, historial, servidorNoDisponible,
     } = this.props;
     const {
       alternarMostrarModalDeAyuda, manejarClick, manejarEscritura, manejarUsuarieEnvioMensaje,
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
            mostrarSobreNostros ? <About /> : !(servidorNoDisponible) ? (
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
            ) : (
              <div className="Chat__Derecha__ServerDown">
                <img src={serverDown} alt="No se pudo conectar al servidor" />
                <span className="Chat__Derecha__ServerDown__ErrorFeedback">
                  NO SE PUDO CONECTAR CON ALBERTO, INTENTÁ MÁS TARDE POR FAVOR
                </span>
              </div>
            )
          }

           { this.charlaEstaTerminada() && (
           <div className="Chat__CharlaTerminada">
             {!mostrarSobreNostros && (
             <div className="Chat__CharlaTerminada__AlbertoCalienteFeedback">
               <img className="Chat__CharlaTerminada__AlbertoCalienteFeedback__Icon" src={termometro} alt="Alberto se calentó" />
               <span className="Chat__CharlaTerminada__AlbertoCalienteFeedback__Text">
                  Alberto se calentó y se fue
               </span>
             </div>
             )}
             <SecondaryButton
               text={mostrarSobreNostros ? 'Reiniciar' : 'Continuar'}
               style={{ marginBottom: '10px' }}
               clickHandler={manejarClick}
             />
           </div>
           )
          }
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
  servidorNoDisponible: state.general.servidorNoDisponible,
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
  servidorNoDisponible: PropTypes.bool.isRequired,
  usuarieEnvioMensaje: PropTypes.func.isRequired,
};

Chat.defaultProps = {
  charlaTerminada: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
