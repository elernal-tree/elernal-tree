import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixed',
})
export class FixedPipe implements PipeTransform {
  transform(value: number, ...args: [number?, boolean?]): unknown {
    const fractionDigits = args[0] ?? 2;
    const isPercent = args[1] ?? true;

    return (value * (isPercent ? 100 : 1)).toFixed(fractionDigits);
  }
}
