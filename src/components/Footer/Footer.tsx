import React from 'react';
import './Footer.scss';
import mailImg from '../../assets/mail.png';
import gitImg from '../../assets/git.png';

export const Footer = () => {
  return (
    <div className="container footer">
      <div className="footer__contact">
        <a target="_blank" rel="noreferrer" href="https://github.com/Res1dentEvil">
          <img className="footer__img" src={gitImg} alt="github" />
          <span>git hub</span>
        </a>
      </div>
      <div className="footer__contact">
        <a target="_blank" rel="noreferrer" href="mailto:davidenkovano@gmail.com">
          <img className="footer__img" src={mailImg} alt="mail" />
          <span>davidenkovano@gmail.com</span>
        </a>
      </div>
    </div>
  );
};
