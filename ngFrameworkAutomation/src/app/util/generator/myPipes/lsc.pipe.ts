import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'LSC'
})
export class LSCPipe implements PipeTransform {

  transform(input:String): string {
    let output = "";
    input = input.trim();

    for(let i = 0; i < input.length;i++){
        if(input[i] == " " || input[i] == "_"){
          output += "_";
        }else if(input[i].toUpperCase() == input[i]){
          output += "_" + input[i].toLowerCase();
        }else{
          output += input[i];
        }
    }
      return output;
    }
}
