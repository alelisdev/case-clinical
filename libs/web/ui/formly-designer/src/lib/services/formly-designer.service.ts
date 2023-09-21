import { FormlyFieldConfig } from '@ngx-formly/core';
import { Injectable } from '@angular/core';
import { customFunctions, KeyEvents } from '../form-designer/constants';
import { selectFormVariants } from '../select-form-variants';
import { transpile } from 'typescript';
import { WebUiFormField } from '@case-clinical/web/ui/form';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { gridVariants } from '../grid-variants';
import { webFormVariants } from '../web-form-variants';
import * as moment from 'moment'

@Injectable({ providedIn: 'root' })
export class FormlyDesignerService {

  checkbox = WebUiFormField.checkbox;
  date = WebUiFormField.date;
  datepicker = WebUiFormField.date;
  enum = WebUiFormField.enum;
  datetime = WebUiFormField.datetime;
  email = WebUiFormField.email;
  file = WebUiFormField.file;
  simpleTypeahead = WebUiFormField.simpleTypeahead;
  image = WebUiFormField.image;
  fileViewer = WebUiFormField.fileViewer;
  stepper = WebUiFormField.stepper;
  fieldRow = WebUiFormField.group;
  fieldGroup = WebUiFormField.fieldGroup;
  field = WebUiFormField.field;
  input = WebUiFormField.input;
  hidden = WebUiFormField.hidden;
  boolean = WebUiFormField.boolean;
  code = WebUiFormField.code;
  multiSelect = WebUiFormField.multiSelect;
  cardHolder = WebUiFormField.cardHolder;
  divider = WebUiFormField.divider;
  markdown = WebUiFormField.markdown;
  grid = WebUiFormField.grid;
  repeat = WebUiFormField.repeat;
  multicheckbox = WebUiFormField.multicheckbox;
  number = WebUiFormField.number;
  integer = WebUiFormField.integer;
  colorPicker = WebUiFormField.colorPicker;
  currency = WebUiFormField.currency;
  password = WebUiFormField.password;
  radio = WebUiFormField.radio;
  toggle = WebUiFormField.toggle;
  url = WebUiFormField.url;
  select = WebUiFormField.select2Dropdown;
  selectForm = WebUiFormField.selectForm;
  selectSearch = WebUiFormField.selectSearch2SelectForm;
  dropdown = WebUiFormField.dropdown;
  typeahead = WebUiFormField.typeahead;
  jsonEditor = WebUiFormField.jsonEditor;
  textarea = WebUiFormField.textarea;
  template = WebUiFormField.template;
  time = WebUiFormField.time;
  card = WebUiFormField.card;
  collapse = WebUiFormField.collapse;
  tabs = WebUiFormField.tabs;
  tab = WebUiFormField.tab;
  heading = WebUiFormField.heading;
  title = WebUiFormField.title;
  picture = WebUiFormField.picture;
  section = WebUiFormField.section;

  slots = [];

  constructor(private toast: WebUiToastService) {}

  encodeFormlyConfig = (configString) => {
    let parseError = false;
    const functions = [];

    let configWithOutFunctions = configString;
    let matchResult;
    while (
      (matchResult = configWithOutFunctions.match(/(async )*\(.*\) *=> *\{/))
    ) {
      const length = matchResult[0].length;
      const index = matchResult.index;
      const inputLength = configWithOutFunctions.length;

      let currentIndex = index + length;

      let openCnt = 1;

      let foundFunctionEnd = false;

      while (currentIndex <= inputLength) {
        if (openCnt === 0) {
          foundFunctionEnd = true;
          break;
        }
        switch (configWithOutFunctions[currentIndex]) {
          case "{":
            openCnt += 1;
            break;
          case "}":
            openCnt -= 1;
            break;
          default:
            break;
        }
        currentIndex += 1;
      }

      if (foundFunctionEnd) {
        functions.push(configWithOutFunctions.substring(index, currentIndex));
        configWithOutFunctions = `${configWithOutFunctions.substring(
          0,
          index - 1
        )}"function_body"${configWithOutFunctions.substring(
          currentIndex + 1,
          configWithOutFunctions.length
        )}`;
      } else {
        parseError = true;
        break;
      }
    }

    if (parseError) return null;
    let resultString = "";

    while (configWithOutFunctions.length > 0) {
      // eslint-disable-next-line no-cond-assign
      if(matchResult = configWithOutFunctions.match(/source: *([^,]*),/)) {
          functions.push(matchResult[1]);
          resultString +=  `${configWithOutFunctions.substring(0, matchResult.index)}source:"expression",`;

          configWithOutFunctions = configWithOutFunctions.substring(matchResult.index + matchResult[0].length, configWithOutFunctions.length);
      // eslint-disable-next-line no-cond-assign
      } else if(matchResult = configWithOutFunctions.match(/valuesObservable: *([^,]*),/)) {
          functions.push(matchResult[1]);
          resultString +=  `${configWithOutFunctions.substring(0, matchResult.index)}valuesObservable:"expression",`;
          configWithOutFunctions = configWithOutFunctions.substring(matchResult.index + matchResult[0].length, configWithOutFunctions.length);
      } else {
          resultString += configWithOutFunctions;
          configWithOutFunctions = "";
      }
    }

    return this.decodeFormlyConfig({ encoded: resultString, functions });
  };

  decodeFormlyConfig = ({ encoded, functions }) => {
    let decoded = encoded;
    while (decoded.includes('"function_body"') && functions.length > 0) {
      const func = functions.shift();
      decoded = decoded.replace(/"function_body"/, JSON.stringify(func))
    };
    while (decoded.includes('"expression"') && functions.length > 0) {
      const func = functions.shift();
      decoded = decoded.replace(/"expression"/, JSON.stringify(func));
    }
    return decoded;
  }

  parseFomlyConfig = (configString) => {
    const encoded = this.encodeFormlyConfig(configString);
    const formlyFields = this.evaluate(encoded);
    return JSON.stringify(formlyFields);
  }

  evaluate(statement: string) {
    try {
      const refinedStatement = statement.replace(/WebUiFormField/g, "this");
      const mediumResult = transpile(refinedStatement);
      const evaluatedResult = eval(mediumResult);
      return evaluatedResult;
    } catch (e) {
      return statement;
    }
  }

  initializeFieldConfigs(schema: FormlyFieldConfig[], customLayouts: any) {
    return schema.map((fieldConfig) => {
      return this.mapField(fieldConfig, customLayouts)
    }).filter(el => el)
  }

  mapField(field: FormlyFieldConfig, customLayouts: any = {}) {
    // Do modification for select-form form fields
    if (field.templateOptions['slot']) {
      delete field.templateOptions['slot'];
      const contentField = this.slots.shift();
      if (contentField) {
        field.fieldGroup = Array.isArray(contentField) ? contentField : [contentField];
        return this.mapField(field, customLayouts);
      } else {
        field.fieldGroup = [
          {
            type: "paragraph",
            templateOptions: {
              html: "Slot is empty",
            },
            className: "text-xl text-red-800 font-normal leading-normal w-full text-center"
          }
        ]
        field.className += ' border-1 border-dashed	 border-red-900 px-2 py-2 rounded-md'
        return this.mapField(field, customLayouts);
      }
    }

    if (field.type === 'custom-component') {
      const name = field.name;
      if (customLayouts[name]) {
        const originalField = JSON.parse(customLayouts[name])[0] as FormlyFieldConfig;
        if(field.templateOptions['dataFeedMode'] in [1, 2]) {
          try {
            originalField.wrappers.unshift('context-provider');
          } catch (e) {
            originalField.wrappers = [ 'context-provider' ]
          } finally {
            originalField.templateOptions = {
              ...originalField.templateOptions,
              ...field.templateOptions,
            }
          }
        }
        originalField.className = `${originalField.className ?? ''} ${field.className ?? ''}`;
        return this.mapField(originalField, customLayouts)
      } else {
        return null;
      }
    }


    if (field.type === 'custom-wrapper') {
      const name = field.name;
      if (customLayouts[name]) {
        const originalField = JSON.parse(customLayouts[name])[0] as FormlyFieldConfig;
        originalField.className = `${originalField.className ?? ''} ${field.className ?? ''}`;
        this.slots = field.fieldGroup ?? [];
        return this.mapField(originalField, customLayouts)
      } else {
        return null;
      }
    }


    if (field.type === 'select-form') {
      const variant = field.templateOptions['variant'];
      if(!selectFormVariants.includes(variant)) {
        field.type = 'paragraph';
        field.templateOptions['html'] = `<span style="border: 1px solid red; border-radius: 10px; padding: 5px;">Not found ${variant}-select</span>`;
        field.className += " flex items-center px-4 font-bold text-lg text-red-900 italic";
        field.wrappers = ['form-field']
      } else {
        field.type = `${field.templateOptions['variant']}-select`;
        delete field.templateOptions['variant'];
      }
    }

    if (field.type === 'web-form') {
      const variant = field.templateOptions['variant'];
      if (!webFormVariants.includes(variant)) {
        field.type = 'paragraph';
        field.templateOptions['html'] = `<span style="border: 1px solid red; border-radius: 10px; padding: 5px;">Not found ${variant}-form</span>`;
        field.className += " flex items-center px-4 font-bold text-lg text-red-900 italic";
        field.wrappers = ['form-field']
      } else {
        field.type = `${field.templateOptions['variant']}-form`;
        delete field.templateOptions['variant'];
      }
    }

    if (field.type === 'grid') {
      const variant = field.templateOptions['variant'];
      if (!gridVariants.includes(variant)) {
        field.type = 'paragraph';
        field.templateOptions['html'] = `<span style="border: 1px solid red; border-radius: 10px; padding: 5px;">Undefined ${variant}-grid</span>`;
        field.className += " flex items-center px-4 font-bold text-lg text-red-900 italic";
        field.templateOptions['label'] = field.templateOptions['title'];
        field.wrappers = ['form-field']
      } else {
        field.type = `${field.templateOptions['variant']}-grid`;
        delete field.templateOptions['variant'];
      }
    }

    // ExpressionProperties
    if(field.expressionProperties) {
      const evaluatedExpressions = {}
      Object.entries(field.expressionProperties).map(([key, value], index) => {
        if(value instanceof Function) {
          evaluatedExpressions[key] = value;
        } else {
          const func = this.evaluate(String(value));
          if(func instanceof Function) {
            evaluatedExpressions[key] = func;
          } else {
            evaluatedExpressions[key] = value;
          }
        }
      });
      field.expressionProperties = evaluatedExpressions;
    }

    // Style Expression
    if(field.templateOptions.styleExpression) {
      const styleExpression = this.evaluate(field.templateOptions.styleExpression);
      field.templateOptions.styleExpression = styleExpression;
    }

    // Class Expression
    if(field.templateOptions.classExpression) {
      const classExpression = this.evaluate(field.templateOptions.classExpression);
      field.templateOptions.classExpression = classExpression;
    }

    // Hooks
    if(field.hideExpression) {
      const func = this.evaluate(String(field.hideExpression));
      if(func instanceof Function) {
        field.hideExpression = func;
      }
    }
    if(field.hooks) {
      const evaluatedHooks = {}
      Object.entries(field.hooks).map(([name, body], index) => {
        // If this is originally function, no need to parse
        if(body instanceof Function) {
          evaluatedHooks[name] = body;
        } else {   // If this is string, then parse to javascript function
          const func = this.evaluate(String(body));
          evaluatedHooks[name] = func;
        }
      })
      field.hooks = evaluatedHooks;
    }

    // Key Events
    KeyEvents.map(keyeventName => {
      if(field.templateOptions && field.templateOptions[keyeventName] && !(field.templateOptions[keyeventName] instanceof Function)) {
        const keyeventFunc = this.evaluate(String(field.templateOptions[keyeventName]));
        field.templateOptions[keyeventName] = keyeventFunc;
      }
    })

    // Custom Functions
    const _customFunctions = customFunctions[field.type] ?? []
    _customFunctions.map(({ name })=> {
      if(field.templateOptions[name] && !(field.templateOptions[name] instanceof Function)) {
        const customFunc = this.evaluate(String(field.templateOptions[name]));
        field.templateOptions[name] = customFunc;
      }
    })
    // AgChart-specific functions evaluation like label formatter, tooltip renderer functions
    if (field.type === 'ag-chart') {
      if (field.templateOptions.series) {
        field.templateOptions.series = field.templateOptions.series.map(el => {
          let formatterFunc = null;
          let rendererFunc = null;
          if (el.label?.formatter) {
            formatterFunc = this.evaluate(el.label?.formatter);
          }
          if (el.tooltip?.renderer) {
            rendererFunc = this.evaluate(el.tooltip.renderer);
          }
          return {
            ...el,
            label: {
              ...el.label,
              formatter: formatterFunc ?? undefined,
            },
            tooltip: {
              ...el.tooltip,
              renderer: rendererFunc ?? undefined
            }
          }
        })
      }
      if (field.templateOptions.axes) {
        field.templateOptions.axes = field.templateOptions.axes.map(el => {
          let formatterFunc = null;
          if (el.label?.formatter) {
            formatterFunc = this.evaluate(el.label?.formatter);
          }
          return {
            ...el,
            label: {
              ...el.label,
              formatter: formatterFunc ?? undefined,
            },
          }
        })
      }
    }

    let fieldGroup = null;
    let usingFieldArray = false;

    const fieldArray = field.fieldArray;
    if (fieldArray) {
      if (fieldArray.fieldGroup) {
        fieldGroup = fieldArray.fieldGroup;
        usingFieldArray = true;
      } else {
        return;
      }
    }

    if(!fieldGroup) {
      fieldGroup = field.fieldGroup;
    }

    if(fieldGroup && fieldGroup.length > 0) {
      const fields =  fieldGroup.map(field => {
        return this.mapField(field, customLayouts);
      })
      if(usingFieldArray) {
        field.fieldArray.fieldGroup = fields
      } else {
        field.fieldGroup = fields;
      }
    }
    return field;
  }
}
