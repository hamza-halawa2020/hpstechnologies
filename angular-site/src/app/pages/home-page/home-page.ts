import { Component } from '@angular/core';
import { HeroSection } from '../../sections/hero-section/hero-section';
import { ServicesSection } from '../../sections/services-section/services-section';
import { StatsSection } from '../../sections/stats-section/stats-section';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, ServicesSection, StatsSection],
  template: `
    <app-hero-section />
    <app-stats-section />
    <app-services-section />
  `,
})
export class HomePage {}
