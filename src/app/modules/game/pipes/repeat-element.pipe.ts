import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'repeatElement'
})
export class RepeatElementPipe implements PipeTransform {

  transform(value: number): any {
    console.log('im in pipe', value)
    const iter = {} as Iterable<number>;   console.log('1')
    iter[Symbol.iterator] = function*() {
      let n = 0;
      while (n < value) {
        yield ++n;
        console.log(n);
      }
    };
    return iter;
  }

}
