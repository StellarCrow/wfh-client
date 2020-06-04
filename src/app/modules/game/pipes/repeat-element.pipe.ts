import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'repeatElement'
})
export class RepeatElementPipe implements PipeTransform {

  transform(value: number): any {
    const iter = {} as Iterable<number>;
    iter[Symbol.iterator] = function*() {
      let n = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iter;
  }

}
