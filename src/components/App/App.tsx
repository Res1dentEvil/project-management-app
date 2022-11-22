import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Header } from '../Header/Header';
import { HomePage } from '../../pages/HomePage/HomePage';
import './App.css';
import AddBoardPage from '../../pages/AddBoardPage/AddBoardPage';
import BoardsPage from '../../pages/BoardsPage/BoardsPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { Footer } from '../Footer/Footer';

export const store = setupStore();

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="main__wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/create" element={<AddBoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Provider>
  );
};
