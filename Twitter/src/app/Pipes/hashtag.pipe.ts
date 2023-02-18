import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashtag'
})
export class HashtagPipe implements PipeTransform {

  transform(value: string): string {
    const replaced = value.replace(/(@\w+)/g, '<a href="#" style="color:blue">$1</a>').replace(/(#\w+)/g, '<a href="#" style="color:blue">$1</a>');
    return replaced;
  }

}
