import React from 'react';
import PropTypes from 'prop-types';

import Logotipo from '../../assets/img/logotipo.png';
import LogoFinal from '../../assets/img/logo-final.png';

const devolverLogoRequerido = logoRequerido => (logoRequerido === 'logo' ? LogoFinal : Logotipo);


const LogoReusable = (props) => {

  const { className, tipo } = props;

  return (
    <img
      alt="Charla con Alberto"
      className={className}
      src={devolverLogoRequerido(tipo)}
    />
  );
};


LogoReusable.propTypes = {
  className: PropTypes.string,
  tipo: PropTypes.oneOf(['logotipo', 'logo']),
};

LogoReusable.defaultProps = {
  className: '',
  tipo: 'logo',
};

export default LogoReusable;
