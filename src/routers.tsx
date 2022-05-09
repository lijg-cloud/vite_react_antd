import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const News = lazy(() => import('./pages/News'));
const Home = lazy(() => import('./pages/Home'))

const Routers: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/news" element={<News />} />
    </Routes>
  </Suspense>
);

export default Routers;
