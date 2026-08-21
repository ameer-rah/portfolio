import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const Experience = lazy(() => import('./pages/Experience'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
