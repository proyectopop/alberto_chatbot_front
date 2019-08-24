import React from 'react';
import PropTypes from 'prop-types';

import './About.sass';

const About = (props) => {

  const { alternarModalDeAyuda, esModal } = props;

  return (
    <section className="About">

      { esModal && (
      <button
        className="About__ModalCloseButton"
        onClick={alternarModalDeAyuda}
        type="button"
      >&times;
      </button>
      )}

      <div>
        <h2>¿QUÉ ES ESTO?</h2>
        <p>
          Es un programa que intenta simular a Alberto Fernández.
          Pero no sólo al Alberto en su faceta como
          candidato en campaña electoral, sino a la persona.
          La mayoría de las respuestas son tomadas de entrevistas o
          tweets.
        </p>
      </div>

      <div>
        <h2>¿QUIÉN LO HIZO?</h2>
        <p>
          Un pequeño grupo de compañeres en apoyo a la fórmula
          Fernández-Fernández.
          El proyecto inició con la idea de recoger las simpáticas
          respuestas de Alberto en Twitter y luego fue mutando en
          algo más serio y complejo: que responda también a cualquier tema
          relevante para un Alberto candidato a presidente.
        </p>
      </div>

    </section>
  );
};

About.propTypes = {
  alternarModalDeAyuda: PropTypes.func.isRequired,
  esModal: PropTypes.bool,
};

About.defaultProps = {
  esModal: false,
};

export default About;
