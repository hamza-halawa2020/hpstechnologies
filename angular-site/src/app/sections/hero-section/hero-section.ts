import { Component } from '@angular/core';
import { asset } from '../../shared/site-data';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
})
export class HeroSection {
  protected readonly poster = asset('images/hero-poster.jpg');
  protected readonly video = asset('video/hero.mp4');
}
