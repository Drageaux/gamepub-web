import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: any, field: string, order = 1): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    const result = [...array].sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1 * order;
      } else if (a[field] > b[field]) {
        return 1 * order;
      } else {
        return 0;
      }
    });
    return result;
  }
}
