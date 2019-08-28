import React from 'react';
import PropTypes from 'prop-types';
import Modalizer from 'react-modal';

import History from '../History/History';
import Input from '../TextInput/TextInput';
import About from '../About/About';
import estado from '../../constants/estados';

import avatar from '../../assets/img/avatar.jpg';
import pregunta from '../../assets/img/pregunta.svg';

import './ChatBox.sass';

const ajustarColorSegunEstado = (estadoDeAlberto) => {

  if (estadoDeAlberto === estado.conectado) {
    return 'text-success';

  }
  if (estadoDeAlberto === estado.desconectado) {
    return 'text-error';
  }

  return 'text-bold';

};
const ajustarTextoSegunEstado = (estadoDeAlberto) => {

  if (estadoDeAlberto === estado.conectado) {
    return ' conectado';
  }

  if (estadoDeAlberto === estado.desconectado) {
    return ' desconectado';
  }

  return ' escribiendo...';

};

const ChatBox = (props) => {

  const {
    alternarMostrarModalDeAyuda, charlaTerminada, estadoDeAlberto, historial,
    mensaje, manejarEscritura, mostrarModalDeAyuda, procesarMensajeUsuario,
  } = props;

  return (
    <div className="ChatBox">

      <div className="ChatBox__Encabezado">
        <img src={avatar} alt="Alberto Fernández Avatar" className="ChatBox__Encabezado__Avatar" />
        <div className="ChatBox__Encabezado__Status-Label">
          Alberto está
          <span className={ajustarColorSegunEstado(estadoDeAlberto)}>
            {ajustarTextoSegunEstado(estadoDeAlberto)}
          </span>
        </div>
        <img
          alt="Sobre este chat-bot"
          className="ChatBox__Encabezado__SignoDePregunta"
          height="20px"
          src={pregunta}
          onClick={alternarMostrarModalDeAyuda}
          width="20px"
        />

        <Modalizer
          isOpen={mostrarModalDeAyuda}
          overlayClassName="ChatBox__Modal__Overlay"
          portalClassName="ChatBox__Modal"
        >
          <About alternarModalDeAyuda={alternarMostrarModalDeAyuda} esModal />
        </Modalizer>

      </div>

      <div className="ChatBox__Cuerpo">
        <History historial={historial} />
      </div>

      <div className="Chatbox__Pie">
        {!charlaTerminada
              && (
              <Input
                mensaje={mensaje}
                manejarEscritura={manejarEscritura}
                procesarMensajeUsuario={procesarMensajeUsuario}
              />
              )
      }

      </div>

    </div>
  );
};

export default ChatBox;

ChatBox.propTypes = {
  alternarMostrarModalDeAyuda: PropTypes.func.isRequired,
  charlaTerminada: PropTypes.bool.isRequired,
  estadoDeAlberto: PropTypes.string.isRequired,
  historial: PropTypes.arrayOf(PropTypes.object).isRequired,
  mensaje: PropTypes.string.isRequired,
  manejarEscritura: PropTypes.func.isRequired,
  mostrarModalDeAyuda: PropTypes.bool.isRequired,
  procesarMensajeUsuario: PropTypes.func.isRequired,
};
