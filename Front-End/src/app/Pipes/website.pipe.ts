import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'website',
})
export class WebsitePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    // remove www and http and //

    if (value) {
      value = value
        .toString()
        .replace('www.', '')
        .replace('http://', '')
        .replace('https://', '')
        .replace('//', '');
    }

    return value;
  }
}
