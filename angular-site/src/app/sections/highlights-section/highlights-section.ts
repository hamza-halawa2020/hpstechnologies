import { Component } from '@angular/core';
import { highlights } from '../../shared/site-data';

@Component({
  selector: 'app-highlights-section',
  templateUrl: './highlights-section.html',
})
export class HighlightsSection {
  protected readonly highlights = highlights;
}
