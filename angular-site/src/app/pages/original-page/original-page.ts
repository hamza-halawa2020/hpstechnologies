import { Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { originalPages } from '../../shared/original-pages';

@Component({
  selector: 'app-original-page',
  template: '<main class="original-page" [innerHTML]="pageHtml()"></main>',
})
export class OriginalPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly pageHtml = computed(() => {
    const key = this.route.snapshot.data['pageKey'] as keyof typeof originalPages;
    return this.sanitizer.bypassSecurityTrustHtml(originalPages[key] ?? originalPages['home']);
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
      )
      .subscribe(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
  }
}
