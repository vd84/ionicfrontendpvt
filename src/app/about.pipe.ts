import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'about'
})
export class AboutPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
