import React from 'react';
import {
  FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon,
} from 'react-share';

import './Share.sass';

const url = 'https://charlaconalberto.now.sh';
const message = 'Preguntale lo que quieras a Alberto';
const hashtags = ['AlbertoFernandez'];

const buttonStyles = {
  cursor: 'pointer',
};
const iconBgStyle = {
  fill: 'transparent',
};
const logoFillColor = '#FDFFFC';

const Share = () => (
  <aside className="Share">

    <FacebookShareButton url={url} quote={message} style={buttonStyles}>
      <FacebookIcon size={32} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
    </FacebookShareButton>

    <TwitterShareButton url={url} title={message} hashtags={hashtags} style={buttonStyles}>
      <TwitterIcon size={32} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
    </TwitterShareButton>

    <TelegramShareButton url={url} title={message} style={buttonStyles}>
      <TelegramIcon size={32} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
    </TelegramShareButton>

    <WhatsappShareButton url={url} title={message} style={buttonStyles}>
      <WhatsappIcon size={32} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
    </WhatsappShareButton>

  </aside>
);

export default Share;
