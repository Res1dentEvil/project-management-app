import React from 'react';
import HomeImg from '../../assets/home.png';
import './HomePage.scss';
import { Button } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const router = useNavigate();
  const handlerOnClick = () => {
    router('/boards');
  };
  return (
    <div className="container home-page">
      <div className="home-page__description">
        <h1>Tasks</h1>
        <h1>Manager</h1>
        <p className="home-page__paragraph">
          It is a project management software that allows you to centrally manage tasks and their
          timely completion. Trackers are widely used in project management, because they allow you
          to easily monitor all work processes and control the work of the team
        </p>
        <Button onClick={handlerOnClick} value={'GET STARTED'} className={'btn__get-started'} />
      </div>
      <div className="home-page__img">
        <img src={HomeImg} alt="home-page" />
      </div>
    </div>
  );
};
