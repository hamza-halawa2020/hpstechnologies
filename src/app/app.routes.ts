import { Routes } from '@angular/router';
import { OriginalPage } from './pages/original-page/original-page';

export const routes: Routes = [
  {
    path: '',
    component: OriginalPage,
    title: 'HPS Technologies',
    data: { pageKey: 'home' },
  },
  {
    path: 'engineering-solutions',
    component: OriginalPage,
    title: 'Services | HPS Technologies',
    data: { pageKey: 'services' },
  },
  {
    path: 'cfd-and-simulation-engineers',
    component: OriginalPage,
    title: 'CFD & Simulation | HPS Technologies',
    data: { pageKey: 'cfd' },
  },
  {
    path: 'embedded-electrical-and-software-engineering-services',
    component: OriginalPage,
    title: 'Embedded, Electrical & Software | HPS Technologies',
    data: { pageKey: 'embedded' },
  },
  {
    path: 'mechanical-engineering-services',
    component: OriginalPage,
    title: 'Mechanical Engineering | HPS Technologies',
    data: { pageKey: 'mechanical' },
  },
  {
    path: 'engineering-services',
    component: OriginalPage,
    title: 'About us | HPS Technologies',
    data: { pageKey: 'about' },
  },
  {
    path: 'industry-solutions-engineering-solutions',
    component: OriginalPage,
    title: 'Industries served | HPS Technologies',
    data: { pageKey: 'industries' },
  },
  {
    path: 'engineering-randd-services',
    component: OriginalPage,
    title: 'Contact | HPS Technologies',
    data: { pageKey: 'contact' },
  },
  { path: '**', redirectTo: '' },
];
