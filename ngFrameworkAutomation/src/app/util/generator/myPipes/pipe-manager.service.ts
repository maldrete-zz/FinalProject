import { FormPipe } from './../form.pipe';
import { Injectable } from '@angular/core';
import { UCCPipe } from './ucc.pipe';
import { LCCPipe } from './lcc.pipe';

@Injectable({
  providedIn: 'root'
})
export class PipeManagerService {


  constructor() {
    this.registerPipes();
  }
  pipes                  = {};

   UCCPipeInstance        = new UCCPipe(); // Upper Camel Case
   LCCPipeInstance        = new LCCPipe(); // Lower Camel Case
  FormPipeInstance        = new FormPipe();

  /************************************************************************************************************
  registerPipes:
  *************************************************************************************************************/
  registerPipes(){
    //Pipes
    this.pipes["HIDEME"] = (inputString: string) => { return "" };
    this.pipes["NUL"]    = (inputString: string) => { return inputString };

    this.pipes["LCC"]    = (inputString: string) => { return this.LCCPipeInstance.transform(inputString) };
    this.pipes["UCC"]    = (inputString: string) => { return this.UCCPipeInstance.transform(inputString) };
  }
  /************************************************************************************************************
  getPipe:
  *************************************************************************************************************/
  getPipe(pipeName:string):(inputString:string)=>string{
  let pipe = this.pipes[pipeName];
    if(pipe){
      return pipe;
    }
    return this.pipes["NUL"];
  }

}
