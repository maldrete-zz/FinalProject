import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'LCC'
})
export class LCCPipe implements PipeTransform {

  transform(input:String): string {

  let output = "";
  input = input.trim();
  let nextCaps = false;
  output += input[0].toLowerCase();
  for(let i = 1; i < input.length;i++){

      if(input[i] == " " || input[i] == "_"){
        nextCaps = true;
      }else if(nextCaps){
          output += input[i].toUpperCase();
          nextCaps = false;
      }else{
        output += input[i];
      }
  }

    return output;
  }

}
