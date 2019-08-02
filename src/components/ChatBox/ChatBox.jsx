import React from 'react';
import PropTypes from 'prop-types';

import History from '../History/History';
import Input from '../TextInput/TextInput';
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
    estadoDeAlberto, historial,
    mensaje, manejarEscritura, procesarMensajeUsuario,
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
          width="20px"
        />
      </div>

      <div className="ChatBox__Cuerpo">
        <History historial={historial} />
      </div>

      <div className="Chatbox__Pie">
        <Input
          mensaje={mensaje}
          manejarEscritura={manejarEscritura}
          procesarMensajeUsuario={procesarMensajeUsuario}
        />
      </div>

    </div>
  );
};

export default ChatBox;

ChatBox.propTypes = {
  estadoDeAlberto: PropTypes.string.isRequired,
  historial: PropTypes.arrayOf(PropTypes.object).isRequired,
  mensaje: PropTypes.string.isRequired,
  manejarEscritura: PropTypes.func.isRequired,
  procesarMensajeUsuario: PropTypes.func.isRequired,
};
