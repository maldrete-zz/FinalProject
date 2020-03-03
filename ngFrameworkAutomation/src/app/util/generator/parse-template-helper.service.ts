import { Template } from 'src/app/entities/template/template';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseTemplateHelperService {
  constructor() { }


  compileAllTemplates(template:Template,fieldsToIncrement,oldformMap) {
    let formMap                 = oldformMap;
    let requiredPipes           = {};
    let nonRegexStrings         = [];
    let capturedFieldNames      = [];
    let subTemplatesInEditor    = {};
    let availableSubtemplates   = this.arangeSubTemplates(template);
    let potentialIncrementals   = {};

    let compileTemplate = (namePretenser:string,stringToParse:string) => {
      //Input data into fields
      let templateContent = stringToParse;
      /*
      Create a regex that captures things that look like ?{data}?
      Then we itterate through the string that is the template to find those values
        this is done by capturing next, checking if its a match, inserting into our array,
        and breaking the template so it can find the next one
        this is the pattern for getting the capture ?{someText}?
      */
      let captureRegex = new RegExp('\\?{([^{}]+)}\\?');
      while (true) {
        let captureRegexMatch = captureRegex.exec(templateContent);
        if (!captureRegexMatch) {
          // if there is no match of the regex pattern ?{someText}?, then add the rest of the string .
          if(nonRegexStrings.length > capturedFieldNames.length){
            nonRegexStrings[nonRegexStrings.length -1] += templateContent;
          }else{
            nonRegexStrings.push(templateContent);
          }

          break;
        }
        // starts with the whole string. template string is the remaing string that we have.
        // regex tracks are first hits. which gives our value from first hit on regex string to the end of the regex string
        // takes out the regex looks rest of the string for another regex. we split apart the text in to array split by regex
        if(nonRegexStrings.length > capturedFieldNames.length){
          nonRegexStrings[nonRegexStrings.length -1] += templateContent.substr(0, captureRegexMatch.index);
        }else{
          nonRegexStrings.push(templateContent.substr(0, captureRegexMatch.index));
        }

        let pipeName;
        let directive;
        let directiveArgs;
        let catchInnerContent        = captureRegexMatch[1];
        let parseContentRegex        = new RegExp('([a-zA-Z0-9 \\.]+)(?:=>([a-zA-Z0-9 \\.]+))?(\\[([0-9]*)\\])?');
        let parseContentRegexMatch   = parseContentRegex.exec(catchInnerContent);
        let longName                 = namePretenser + parseContentRegexMatch[1];
        let isMulticatch   =                 parseContentRegexMatch[3];
        let numOfTemplates =        parseInt(parseContentRegexMatch[4]);
        if(parseContentRegexMatch[2]){
          let splitString  =                 parseContentRegexMatch[2].split(".");
          pipeName         =                 splitString[0];
          directive        =                 splitString[1];
          directiveArgs    =                 splitString[2];
        }
        if (isNaN(numOfTemplates))          {numOfTemplates = 0;}
        if (directive == "FIX")             {longName = parseContentRegexMatch[1]}

        if(pipeName == "template"){
          subTemplatesInEditor[longName] = availableSubtemplates[longName];
          if(isMulticatch){
            if (!(directive == "ADDBUTTON")) {
              if(fieldsToIncrement[longName]){
                potentialIncrementals[longName] = fieldsToIncrement[longName];
              }else{
                potentialIncrementals[longName] = 0;
              }
              if(fieldsToIncrement[longName]){
                numOfTemplates += fieldsToIncrement[longName];
              }
            }else{
              if(fieldsToIncrement[directiveArgs]){
                potentialIncrementals[directiveArgs] = fieldsToIncrement[directiveArgs];
              }else{
                potentialIncrementals[directiveArgs] = 0;
              }
              if(fieldsToIncrement[directiveArgs]){
                numOfTemplates += fieldsToIncrement[directiveArgs];
              }
            }
            for(let i =0; i < numOfTemplates;i++){
              compileTemplate(i+".",subTemplatesInEditor[longName]);
            }
          }else{
            compileTemplate("",subTemplatesInEditor[longName]);
          }
        }else{
          requiredPipes[pipeName] = true;
          if(!formMap[longName]){
            formMap[longName] = '';
          }
          capturedFieldNames.push({ pipe: pipeName, findId: longName }); // this grabs the pipe name
        }


        templateContent = templateContent.substr(captureRegexMatch.index + captureRegexMatch[0].length, templateContent.length);
      }

    }
    ////actually call the method;
    compileTemplate("",template.content);
    console.log(formMap);
    console.log(nonRegexStrings);
    console.log(capturedFieldNames);
    console.log(subTemplatesInEditor);
    console.log(potentialIncrementals);
    let results = {
      "formMap"              : formMap,
      "nonRegexStrings"      : nonRegexStrings,
      "capturedFieldNames"   : capturedFieldNames,
      "subTemplatesInEditor" : subTemplatesInEditor,
      "potentialIncrementals": potentialIncrementals
    }
    return results;
  }


  /************************************************************************************************************
  arangeSubTemplates:
  *************************************************************************************************************/
  arangeSubTemplates(template:Template){
    let subTemplates   = template.subTemplates;
    let subTemplateMap = {};

    for(let i = 0; i < subTemplates.length; i++){
      if(subTemplateMap[subTemplates[i].name]){
        console.error("clashing subTemplate Names");
      }
      subTemplateMap[subTemplates[i].name] = subTemplates[i].content;
    }
    return subTemplateMap;
  }








}
