import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { originalPages } from '../../shared/original-pages';

@Component({
  selector: 'app-original-page',
  template:
    '<main class="original-page" [innerHTML]="pageHtml()" (click)="handlePageClick($event)" (submit)="handleFormSubmit($event)"></main>',
})
export class OriginalPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly pageHtml = signal<SafeHtml>(this.sanitizePage('home'));

  constructor() {
    const subscription = this.route.data.subscribe((data) => {
      const key = data['pageKey'] as keyof typeof originalPages;
      this.pageHtml.set(this.sanitizePage(key));
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected handlePageClick(event: MouseEvent): void {
    const menuButton = (event.target as HTMLElement).closest('button.burger');

    if (menuButton) {
      this.toggleMobileMenu(menuButton);
      return;
    }

    const link = (event.target as HTMLElement).closest('a');
    const href = link?.getAttribute('href')?.trim();

    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    const route = this.toAngularRoute(href);

    if (!route) {
      return;
    }

    event.preventDefault();
    void this.router.navigateByUrl(route);
  }

  protected handleFormSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }

  private sanitizePage(key: keyof typeof originalPages): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(originalPages[key] ?? originalPages['home']);
  }

  private toAngularRoute(href: string): string | null {
    const isExternal = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?hpstechnologies\.my\/?/i.test(href);

    if (isExternal) {
      return null;
    }

    const normalized = href
      .replace(/^https?:\/\/(www\.)?hpstechnologies\.my\/?/i, '/')
      .replace(/^(\.\/|\.\.\/)+/g, '/')
      .replace(/\/index\.html$/i, '')
      .replace(/^index\.html$/i, '/')
      .replace(/\/+/g, '/');

    if (normalized === '' || normalized === '/') {
      return '/';
    }

    return normalized.startsWith('/') ? normalized : `/${normalized}`;
  }

  private toggleMobileMenu(button: Element): void {
    const header = button.closest('.block-header');
    const dropdown = header?.querySelector('.block-header-layout-mobile__dropdown');

    dropdown?.classList.toggle('block-header-layout-mobile__dropdown--open');
    button.classList.toggle('burger--open');
  }
}
