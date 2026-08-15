import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { services } from '../../shared/site-data';

@Component({
  selector: 'app-services-section',
  imports: [RouterLink],
  templateUrl: './services-section.html',
})
export class ServicesSection {
  protected readonly services = services;
}
