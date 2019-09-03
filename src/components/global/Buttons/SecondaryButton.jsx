import React from 'react';
import PropTypes from 'prop-types';

import './SecondaryButton.sass';

const SecondaryButton = (props) => {

  const { clickHandler, style, text } = props;

  return (
    <button
      type="button"
      className="button button-secondary accesible-no-focus"
      onClick={clickHandler}
      style={style}
    >
      {text}
    </button>
  );
};

SecondaryButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  style: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
};

export default SecondaryButton;
