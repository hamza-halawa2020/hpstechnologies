import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { pages, services } from '../../shared/site-data';

@Component({
  selector: 'app-content-page',
  imports: [RouterLink],
  templateUrl: './content-page.html',
})
export class ContentPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly services = services;

  protected get page() {
    const key = this.route.snapshot.data['pageKey'] as keyof typeof pages;
    return pages[key];
  }
}
