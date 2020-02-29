import { Template } from 'src/app/entities/template/template';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseTemplateHelperService {
  constructor() { }

  compileAllTemplates(template:Template) {
    let formMap = {};
    let nonRegexStrings = [];
    let capturedFieldNames = [];
    let requiredPipes = {};
    let compileTemplate = (template: Template) => {
      //Input data into fields
      let templateContent = template.content;
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
          nonRegexStrings.push(templateContent);
          break;
        }
        //starts with the whole string. template string is the remaing string that we have.
        // regex tracks are first hits. which gives our value from first hit on regex string to the end of the regex string
        // takes out the regex looks rest of the string for another regex. we split apart the text in to array split by regex
        nonRegexStrings.push(templateContent.substr(0, captureRegexMatch.index));

        let parseContentRegex = new RegExp('([a-zA-Z0-9\\.]+)\\.([a-zA-Z0-9\\[\\]]+)');
        let parseContentRegexMatch = parseContentRegex.exec(captureRegexMatch[1]);
        if (!parseContentRegexMatch) {
          formMap[captureRegexMatch[1]] = "";
          capturedFieldNames.push({ pipe: "", findId: captureRegexMatch[1] });
        } else {
          requiredPipes[parseContentRegexMatch[2]] = true;
          formMap[parseContentRegexMatch[1]] = '';
          capturedFieldNames.push({ pipe: parseContentRegexMatch[2], findId: parseContentRegexMatch[1] }); // this grabs the pipe name
        }
        templateContent = templateContent.substr(captureRegexMatch.index + captureRegexMatch[0].length, templateContent.length);
      }

      for (let i = 0; i < template.subTemplates.length; i++) {
        compileTemplate(template.subTemplates[i]);
      }
    }
    ////actually call the method;
    compileTemplate(template);

    let results = {
      "formMap": formMap,
      "nonRegexStrings": nonRegexStrings,
      "capturedFieldNames": capturedFieldNames,
      "requiredPipes": requiredPipes
    }
    return results;
  }









}
