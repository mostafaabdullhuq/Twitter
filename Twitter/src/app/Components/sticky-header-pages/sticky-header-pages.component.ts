import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-header-pages',
  templateUrl: './sticky-header-pages.component.html',
  styleUrls: ['./sticky-header-pages.component.css'],
})
export class StickyHeaderPagesComponent {
  @Input() title: string = 'Tweet';
  @Input() backURL: string = '/home';
}
