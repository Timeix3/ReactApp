import { LoginPage } from '../pages/LoginPage';
import { NavPage } from '../pages/NavPage';
import { TasksPage } from '../pages/TasksPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ModalRouter } from './ModalRouter';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import type { ComponentType } from 'react';

const NavLayout = NavPage as ComponentType;

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<NavLayout />}>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
      <ModalRouter />
    </BrowserRouter>
  );
}