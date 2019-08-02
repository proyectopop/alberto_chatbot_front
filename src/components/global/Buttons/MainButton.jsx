import React from 'react';
import PropTypes from 'prop-types';

import './MainButton.sass';

const MainButton = (props) => {

  const { clickHandler, text } = props;

  return (
    <button
      type="button"
      className="button button-main accesible-no-focus"
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};


MainButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default MainButton;
