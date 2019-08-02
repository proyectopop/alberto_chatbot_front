import React from 'react';
import PropTypes from 'prop-types';
import ScrollIntoView from 'react-scroll-into-view-if-needed';

import './History.sass';

const classNames = autor => (autor === 'Alberto'
  ? 'ChatHistory__MessageContainer Alberto'
  : 'ChatHistory__MessageContainer Usuarie');

const History = ({ historial }) => (

  <div className="ChatHistory">

    {historial.map(({ autor, mensaje }) => (
      <ScrollIntoView style={{ width: '100%' }}>
        <div className={classNames(autor)} key={mensaje.id}>
          <span>{mensaje.texto}</span>
        </div>
      </ScrollIntoView>
    ))}

  </div>

);

History.propTypes = {
  historial: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default History;
