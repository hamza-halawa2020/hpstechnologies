import { Routes } from '@angular/router';
import { ContentPage } from './pages/content-page/content-page';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'HPS Technologies',
  },
  {
    path: 'engineering-solutions',
    component: ContentPage,
    title: 'Services | HPS Technologies',
    data: { pageKey: 'services' },
  },
  {
    path: 'cfd-and-simulation-engineers',
    component: ContentPage,
    title: 'CFD & Simulation | HPS Technologies',
    data: { pageKey: 'cfd' },
  },
  {
    path: 'embedded-electrical-and-software-engineering-services',
    component: ContentPage,
    title: 'Embedded, Electrical & Software | HPS Technologies',
    data: { pageKey: 'embedded' },
  },
  {
    path: 'mechanical-engineering-services',
    component: ContentPage,
    title: 'Mechanical Engineering | HPS Technologies',
    data: { pageKey: 'mechanical' },
  },
  {
    path: 'engineering-services',
    component: ContentPage,
    title: 'About us | HPS Technologies',
    data: { pageKey: 'about' },
  },
  {
    path: 'industry-solutions-engineering-solutions',
    component: ContentPage,
    title: 'Industries served | HPS Technologies',
    data: { pageKey: 'industries' },
  },
  {
    path: 'engineering-randd-services',
    component: ContentPage,
    title: 'Contact | HPS Technologies',
    data: { pageKey: 'contact' },
  },
  { path: '**', redirectTo: '' },
];
