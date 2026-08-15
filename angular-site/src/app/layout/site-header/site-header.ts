import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { logo, navItems } from '../../shared/site-data';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly logo = logo;
  protected readonly navItems = navItems;
}
