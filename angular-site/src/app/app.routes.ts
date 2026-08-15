import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ContentPage } from './pages/content-page/content-page';
import { pageContent } from './shared/site-data';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'HPS Technologies' },
  {
    path: 'engineering-solutions',
    component: ContentPage,
    title: 'Services | HPS Technologies',
    data: pageContent.services,
  },
  {
    path: 'cfd-and-simulation-engineers',
    component: ContentPage,
    title: 'CFD & Simulation | HPS Technologies',
    data: pageContent.cfd,
  },
  {
    path: 'embedded-electrical-and-software-engineering-services',
    component: ContentPage,
    title: 'Embedded, Electrical & Software | HPS Technologies',
    data: pageContent.embedded,
  },
  {
    path: 'mechanical-engineering-services',
    component: ContentPage,
    title: 'Mechanical Engineering | HPS Technologies',
    data: pageContent.mechanical,
  },
  {
    path: 'engineering-services',
    component: ContentPage,
    title: 'About us | HPS Technologies',
    data: pageContent.about,
  },
  {
    path: 'industry-solutions-engineering-solutions',
    component: ContentPage,
    title: 'Industries served | HPS Technologies',
    data: pageContent.industries,
  },
  {
    path: 'engineering-randd-services',
    component: ContentPage,
    title: 'Contact | HPS Technologies',
    data: pageContent.contact,
  },
  { path: '**', redirectTo: '' },
];
