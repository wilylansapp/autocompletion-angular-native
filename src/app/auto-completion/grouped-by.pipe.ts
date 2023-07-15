import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupedBy',
})
export class GroupedByPipe implements PipeTransform {
  transform(collection: any[], property: string): any[] {
    console.log('start', collection, property);
    if (!collection || !property) {
      return collection;
    }

    const result = Object.keys(collection).map((key) => {
      console.log(key);
      return {
        [property]: key,
        items: collection[key],
      };
    });
    console.log(result);
    return collection;
  }
}
