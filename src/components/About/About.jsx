import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo';

import './About.sass';

const AboutStyles = {
  background: 'whitesmoke',
  borderRadius: '20px',
  maxHeight: '400px',
  overflow: 'scroll',
  padding: '2rem',
  width: '75%',
};

const About = (props) => {

  const { alternarModalDeAyuda, esModal } = props;

  return (
    <section className="About" style={!esModal ? AboutStyles : {}}>

      { esModal && (
      <button
        className="About__ModalCloseButton"
        onClick={alternarModalDeAyuda}
        type="button"
      >&times;
      </button>
      )}

      <div className="About__Content">
        {esModal && <Logo className="About__Content__Logo" tipo="logo" />}

        <div className="About__Content__Item">
          <h2 className="About__Content__Item__Question">¿Qué es esto?</h2>
          <p className="About__Content__Item__Response">
          Es un programa que intenta simular a Alberto Fernández.
          Pero no sólo al Alberto en su faceta como
          candidato en campaña electoral, sino a la persona.
          La gran mayoría de las respuestas son tomadas de entrevistas o
          tweets, adaptándolas al contexto de un chat en la forma más fiel posible.
          </p>
        </div>


        <div className="About__Content__Item">
          <h2 className="About__Content__Item__Question">¿Quién lo hizo?</h2>
          <p className="About__Content__Item__Response">
          Un pequeño grupo de compañeres en apoyo a la fórmula
          Fernández-Fernández.
          El proyecto inició con la idea de recoger las simpáticas
          respuestas de Alberto en Twitter y luego fue mutando en
          algo más serio y complejo: que responda también a cualquier tema
          relevante para un Alberto candidato a presidente.
          </p>
        </div>

        <div className="About__Content__Item">
          <h2 className="About__Content__Item__Question">¿Cómo me contacto con ustedes?</h2>
          <p className="About__Content__Item__Response">
          ¿El chat-bot no respondió lo que querías? ¿Tenés alguna sugerencia
          sobre un tema en particular que creés que nuestro Alberto debería responder?
            <br />
            <b>Podés escribirnos en { ' ' }
              <a
                href="https://twitter.com/alberto_charla"
                target="_blank"
                rel="noopener noreferrer"
              >
              Twitter
              </a>  o enviarnos un { ' ' }
              <a href="mailto:proyecto.pop.argentina@gmail.com">e-mail</a>.
            </b>
          </p>
        </div>

      </div>
    </section>
  );
};

About.propTypes = {
  alternarModalDeAyuda: PropTypes.func,
  esModal: PropTypes.bool,
};

About.defaultProps = {
  alternarModalDeAyuda: () => {},
  esModal: false,
};

export default About;
