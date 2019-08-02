import React from 'react';
import Logotipo from '../../Logo/Logo';

import './Loading.sass';

const Loading = () => (
  <div className="loading">
    <Logotipo tipo="logotipo" />
    <div className="loader" />
  </div>
);

export default Loading;
