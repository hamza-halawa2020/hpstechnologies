import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageData } from '../../shared/site-data';

@Component({
  selector: 'app-content-page',
  imports: [RouterLink],
  templateUrl: './content-page.html',
})
export class ContentPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly page = computed(() => this.route.snapshot.data as PageData);
}
