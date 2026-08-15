import { Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs';

@Component({
  selector: 'app-mirror-page',
  template: '<main #container class="mirror-page"></main>',
})
export class MirrorPage {
  @ViewChild('container', { static: true })
  private readonly container!: ElementRef<HTMLElement>;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const subscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
      )
      .subscribe(() => {
        void this.loadPage();
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private async loadPage(): Promise<void> {
    this.ensureStyles();

    const file = this.route.snapshot.data['file'] as string;
    const response = await fetch(file, { cache: 'no-store' });
    const html = await response.text();
    const documentSnapshot = new DOMParser().parseFromString(html, 'text/html');

    documentSnapshot.querySelectorAll('script').forEach((script) => script.remove());
    documentSnapshot
      .querySelectorAll('link[rel="preconnect"], link[rel="preload"], link[rel="prefetch"]')
      .forEach((link) => link.remove());

    this.container.nativeElement.innerHTML = documentSnapshot.body.innerHTML;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  private ensureStyles(): void {
    [
      '/_astro-1784990859179/_..D2IiofZg.css',
      '/_astro-1784990859179/cookieconsent.DjanN7tQ.css',
      '/static-fix.css',
    ].forEach((href) => {
      if (document.head.querySelector(`link[href="${href}"]`)) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });
  }
}
