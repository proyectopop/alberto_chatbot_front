import React from 'react';
import PropTypes from 'prop-types';

import './Consent.sass';

const Consent = (props) => {

  const {
    alternarConsentimiento, consentimientoDeColaboracion, texto, opcionA, opcionB,
  } = props;

  return (
    <div className="ConsentimientoWrapper">
      <span className="ConsentimentoDisclamer">{texto}</span>
      <div className="customCheckbox">
        <input type="checkbox" id="consentimiento" onChange={alternarConsentimiento} />
        <label htmlFor="consentimiento">{consentimientoDeColaboracion ? opcionA : opcionB}</label>
      </div>
    </div>
  );
};

Consent.propTypes = {
  alternarConsentimiento: PropTypes.func.isRequired,
  consentimientoDeColaboracion: PropTypes.bool.isRequired,
  opcionA: PropTypes.string.isRequired,
  opcionB: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
};

export default Consent;
