import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../assets/img/send.svg';

import './TextInput.sass';

class TextInput extends PureComponent {

  constructor(props) {
    super(props);
    this.responderAEscritura = this.responderAEscritura.bind(this);
  }

  responderAEscritura(event) {

    const { manejarEscritura, procesarMensajeUsuario } = this.props;
    const { keyCode } = event;
    const { value } = event.target;

    if (keyCode === 13) {
      return procesarMensajeUsuario();
    }

    return manejarEscritura(value);
  }

  render() {

    const { mensaje, procesarMensajeUsuario } = this.props;
    const { responderAEscritura } = this;

    return (
      <div className="Input">
        <input
          className="Input__Element accesible-no-focus"
          id="ChatInput"
          maxLength={60}
          placeholder="Escribí tu mensaje acá"
          onChange={responderAEscritura}
          onKeyDown={responderAEscritura}
          type="text"
          value={mensaje}
        />
        <img
          alt="Enviar"
          className="Input__Send-Icon"
          onClick={procesarMensajeUsuario}
          src={Icon}
        />
      </div>
    );
  }
}


TextInput.propTypes = {
  mensaje: PropTypes.string.isRequired,
  manejarEscritura: PropTypes.func.isRequired,
  procesarMensajeUsuario: PropTypes.func.isRequired,
};

export default TextInput;
