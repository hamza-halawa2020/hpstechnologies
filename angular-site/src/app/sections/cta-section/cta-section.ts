import { Component } from '@angular/core';
import { asset } from '../../shared/site-data';

@Component({
  selector: 'app-cta-section',
  templateUrl: './cta-section.html',
})
export class CtaSection {
  protected readonly robot = asset('images/robot-arm.jpg');
}
