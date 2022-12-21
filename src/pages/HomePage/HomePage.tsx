import React from 'react';
import HomeImg from '../../assets/home.png';
import './HomePage.scss';
import { Button } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { t } = useTranslation();
  const router = useNavigate();
  const handlerOnClick = () => {
    router('/boards');
  };
  return (
    <div className="container home-page">
      <div className="home-page__description">
        <h1>{t('homePage.tasks')}</h1>
        <h1>{t('homePage.manager')}</h1>
        <p className="home-page__paragraph">{t('homePage.description')}</p>
        <Button
          onClick={handlerOnClick}
          value={`${t('homePage.btnGetStarted')}`}
          className={'btn__get-started'}
        />
      </div>
      <div className="home-page__img">
        <img src={HomeImg} alt="home-page" />
      </div>
    </div>
  );
};
