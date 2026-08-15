import { Component } from '@angular/core';
import { CtaSection } from '../../sections/cta-section/cta-section';
import { HeroSection } from '../../sections/hero-section/hero-section';
import { HighlightsSection } from '../../sections/highlights-section/highlights-section';
import { IntroSection } from '../../sections/intro-section/intro-section';
import { ServicesSection } from '../../sections/services-section/services-section';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, IntroSection, HighlightsSection, ServicesSection, CtaSection],
  template: `
    <app-hero-section />
    <app-intro-section />
    <app-highlights-section />
    <app-services-section />
    <app-cta-section />
  `,
})
export class HomePage {}
