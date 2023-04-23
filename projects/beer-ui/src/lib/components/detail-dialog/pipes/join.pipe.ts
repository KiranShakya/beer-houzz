import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(value: Array<string> | string, joiner = '<br />'): string {
    if (!Array.isArray(value)) {
      return value;
    }
    // return the generated HTML
    return value.join(joiner);
  }
}
