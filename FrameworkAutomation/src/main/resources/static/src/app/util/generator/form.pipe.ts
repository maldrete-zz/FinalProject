import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'form'

})
export class FormPipe implements PipeTransform {

  transform(value: string): string {

    let splitValue = value.split('.');
    let singleName = splitValue[splitValue.length - 1];
    singleName = singleName[0].toUpperCase() + singleName.substr(1) + ':';

    return singleName;
  }

}
