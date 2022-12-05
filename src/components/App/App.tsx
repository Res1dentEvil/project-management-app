import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage/HomePage';
import BoardsPage from '../../pages/BoardsPage/BoardsPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { Footer } from '../Footer/Footer';
import { LoginPage } from '../../pages/AuthPages/LoginPage';
import { RegistrationPage } from '../../pages/AuthPages/RegistrationPage';
import Board from '../Board/Board';

export const store = setupStore();

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="main__wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/:id" element={<Board />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Provider>
  );
};
