import { Routes } from '@angular/router';
import { MirrorPage } from './pages/mirror-page/mirror-page';

export const routes: Routes = [
  {
    path: '',
    component: MirrorPage,
    title: 'HPS Technologies',
    data: { file: '/mirror/home.html' },
  },
  {
    path: 'engineering-solutions',
    component: MirrorPage,
    title: 'Services | HPS Technologies',
    data: { file: '/mirror/engineering-solutions/index.html' },
  },
  {
    path: 'cfd-and-simulation-engineers',
    component: MirrorPage,
    title: 'CFD & Simulation | HPS Technologies',
    data: { file: '/mirror/cfd-and-simulation-engineers/index.html' },
  },
  {
    path: 'embedded-electrical-and-software-engineering-services',
    component: MirrorPage,
    title: 'Embedded, Electrical & Software | HPS Technologies',
    data: { file: '/mirror/embedded-electrical-and-software-engineering-services/index.html' },
  },
  {
    path: 'mechanical-engineering-services',
    component: MirrorPage,
    title: 'Mechanical Engineering | HPS Technologies',
    data: { file: '/mirror/mechanical-engineering-services/index.html' },
  },
  {
    path: 'engineering-services',
    component: MirrorPage,
    title: 'About us | HPS Technologies',
    data: { file: '/mirror/engineering-services/index.html' },
  },
  {
    path: 'industry-solutions-engineering-solutions',
    component: MirrorPage,
    title: 'Industries served | HPS Technologies',
    data: { file: '/mirror/industry-solutions-engineering-solutions/index.html' },
  },
  {
    path: 'engineering-randd-services',
    component: MirrorPage,
    title: 'Contact | HPS Technologies',
    data: { file: '/mirror/engineering-randd-services/index.html' },
  },
  { path: '**', redirectTo: '' },
];
