import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'propsFilter',
    pure: false
})
export class PropsFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        var filteredItems = items.filter(function(item) {
            var keys = Object.keys(filter);
            var match = false;
            keys.forEach(function(key) {
                var keyVal = filter[key];
                if (item[key] === keyVal) {
                    match = true;
                }
            });
            return match;
        });
        return filteredItems;
    }
}