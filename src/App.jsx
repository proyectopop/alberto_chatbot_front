import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import Landing from './containers/Landing/Landing';
import Chat from './containers/Chat/Chat';

import { clienteModificarAnchoDisponible } from './redux/actions/cliente';

import './App.sass';


function App(props) {

  const { anchoDisponible, charlaComenzada, modificarAnchoDisponible } = props;

  return (
    <div className="App">
      <Measure bounds onResize={size => modificarAnchoDisponible(size.bounds.width)}>
        {({ measureRef }) => (
          <div ref={measureRef}>
            <CSSTransition classNames="fade" in={charlaComenzada} timeout={1000}>
              { charlaComenzada
                ? <Chat anchoDisponible={anchoDisponible} />
                : <Landing anchoDisponible={anchoDisponible} />
              }
            </CSSTransition>
          </div>
        )}
      </Measure>
    </div>
  );
}

const mapStateToProps = state => ({
  anchoDisponible: state.cliente.ancho,
  charlaComenzada: state.general.charlaComenzada,
});

const mapDispatchToProps = dispatch => ({
  modificarAnchoDisponible: nuevoAncho => dispatch(clienteModificarAnchoDisponible(nuevoAncho)),
});


App.propTypes = {
  anchoDisponible: PropTypes.number,
  charlaComenzada: PropTypes.bool.isRequired,
  modificarAnchoDisponible: PropTypes.func.isRequired,
};

App.defaultProps = {
  anchoDisponible: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
