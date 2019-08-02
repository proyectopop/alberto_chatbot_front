import React from 'react';
import PropTypes from 'prop-types';

import './Select.sass';

const Select = (props) => {

  const { options, selectHandler } = props;

  return (

    <select onChange={e => selectHandler(e.target.value)}>
      {options.map(({ key, value }) => <option key={key} value={key}>{value}</option>)}
    </select>

  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  selectHandler: PropTypes.func.isRequired,
};

export default Select;
