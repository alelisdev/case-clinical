import * as constant from "./form-designer/constants"
import { validationItems } from "./types/validation-items"

export class Entity {
  public type: string
  private isWrapper: boolean
  public isArray?: boolean
  public requireKey: boolean

  public id: string
  private parentId: string
  private template: Record<string, any>
  public uniqueId: string

  // private selectClassName = ' border-2 rounded-md border-red-500 shadow-md';
  private selectClassName = ' outline-dotted outline-offset-4 outline-2	outline-red-800';


  constructor(
    type: string,        // input, date, number, datetime, markdown, section, tabs etc
    isWrapper: boolean,  // Wrapper || Field
    isArray: boolean,
    requireKey: boolean, // Require key? Section may have key and may not have key,
    template?: any,
    id?: string,
    parentId?: string,
  ) {
    this.type = type;
    this.isArray = isArray;
    this.isWrapper = isWrapper;
    this.requireKey = requireKey
    this.uniqueId = id;
    this.id = parentId !== null ? `${parentId}/${id}` : id
    this.parentId = parentId
    if(template) {
      this.template = template;
      return;
    }

    this.template = {
      className: ""
    }
    if(this.requireKey) {
      this.template = {
        key: "",
        type: this.type,
        ...this.template
      }
    }
  }

  public static fromTemplate(template: any, id?: string, parentId?: string): Entity {
    if(!template) return null;


    const keys = Object.keys(template)
    const requireKey = keys.includes('key');
    const isWrapper = keys.includes('wrappers');
    const isArray = keys.includes('isArray');
    let type = template.type;
    let title = template.type;
    if(isWrapper && !isArray) {
      type =  template.wrappers[0];
      title = type;
    }
    return new Entity(type, isWrapper, isArray, requireKey, template, id, parentId)
  }

  public clone(uniqueId: string, parentId: string): Entity {
    return new Entity(this.type, this.isWrapper, this.isArray, this.requireKey, {
      ...this.template,
      templateOptions: { ...this.template.templateOptions}
    }, uniqueId, parentId);
  }

  public pushFieldGroup() : any[] {
    const fieldGroup = this.isArray ? this.template.fieldArray.fieldGroup : (this.isWrapper ? this.template.fieldGroup : null)
    return fieldGroup;
  }

  public get ID() : string {
    return this.id;
  }

  public get Template() : any {
    return this.template
  }


  public set Template(v : any) {
    this.template = v;
  }

  public cleanTemplate() {
    if(!this.Selected) return this.Template;
    else {
      return {
        ...this.Template,
        className: this.ClassName
       }
    }
  }

  public deleteValue(key: string) {
    delete this.template.templateOptions[key];
  }

  public getValue(key: string) {
    return this.template.templateOptions[key];
  }

  public setValue(key: string, value: any) {
    this.template.templateOptions[key] = value;
  }

  public setValues(values: any) {
    for(const key in values) {
      this.setValue(key, values[key])
    }
  }

  public clearValidations() {
    const validationKeys = validationItems.map(el => el.id);
    Object.keys(this.template.templateOptions).map(key => {
      if(validationKeys.includes(key)) {
        delete this.template.templateOptions[key];
      }
    })
  }

  public clearChildren() {
    if(this.IsWrapper) {
      if(this.isArray) {
        this.template.fieldArray['fieldGroup'] = [];
      } else {
        this.template['fieldGroup'] = [];
      }
    }
  }

  public addChildren(template: any) {
    if(this.IsWrapper) {
      if(this.isArray) {
        if(!this.template.fieldArray.fieldGroup) {
          this.template.fieldArray['fieldGroup'] = []
        }
        this.template.fieldArray.fieldGroup.push(template);
      } else {
        if(!this.template.fieldGroup) {
          this.template['fieldGroup'] = []
        }
        this.template.fieldGroup.push(template);
      }
    }
  }

  public get IsWrapper() : boolean {
    return this.isArray || this.isWrapper;
  }

  public get Title() : string {
    return this.type === 'custom-component' ? this.template['name'] : Entity.capitalizeFirstLetter(this.type);
  }

  public get Type() : string {
    return this.isWrapper ? "Wrapper" : 'Field'
  }


  public get TemplateOptionKeys() : string[] {
    return this.template.templateOptions ? Object.keys(this.template.templateOptions) : []
  }

  public get Label() : string {
    return this.template.templateOptions['label'] || this.template.templateOptions['title'];
  }

  public get Key() : string {
    return this.template.key;
  }

  public set Key(v : string) {
    // if(this.requireKey) {
      this.template.key = v;
    // }
  }

  public get DataKey(): string {
    return this.getValue('dataKey') ?? ''
  }

  public get HideExpression() : string {
    return this.template.hideExpression;
  }

  public set HideExpression(v : string) {
    if(!v || v.length === 0) {
      delete this.template['hideExpression'];
      return;
    }
    this.template['hideExpression'] = v;
  }

  public get CustomHideExpression() : string {
    return this.template.customHideExpression;
  }

  public set CustomHideExpression(v : string) {
    if(!v || v.length === 0) {
      delete this.template['customHideExpression'];
      return;
    }
    this.template['customHideExpression'] = v;
  }

  public get Slot() : boolean {
    return this.IsWrapper && this.template.templateOptions['slot'];
  }

  public set Slot(v : boolean) {
    if(!v) {
      delete this.template.templateOptions['slot'];
    } else {
      this.template.templateOptions['slot'] = v;
    }
  }

  public clearValidationMessages() {
    delete this.template['validation'];
  }

  public getValidationMessage(key): string {
    const validationMessages = this.template.validation?.messages;
    return validationMessages ? validationMessages[key] : null;
  }

  public setValidationMessage(key: string, message: string) {
    if(!this.template.validation) this.template['validation'] = {
      messages: {}
    };
    this.template.validation.messages[key] = message;
  }


  public get KeyEvents() : any[] {
    const keyEvents = [];
    constant.KeyEvents.map(eventName => {
      const eventFuncBody = this.template.templateOptions[eventName];
      if(eventFuncBody) {
        keyEvents.push({
          keyevent: { key: eventName, value: eventFuncBody }
        })
      }
    });
    return keyEvents;
  }

  public set KeyEvents(v : any[]) {
    // Remove existing key events first
    constant.KeyEvents.map(eventName => {
      delete this.template.templateOptions[eventName];
    })

    v.map(keyEvent => {
      const eventDetail = keyEvent.keyevent;
      this.template.templateOptions[eventDetail.key] = eventDetail.value;
    })
  }

  public get CustomFunctions() : any[] {
    const customFunctions = [];
    const customFunctionTemplates = constant.customFunctions[this.type];
    if(!customFunctionTemplates) return [];

    customFunctionTemplates.map(({ name }) => {
      const funcBody = this.template.templateOptions[name];
      if(funcBody) {
        customFunctions.push({
          func: { key: name, value: funcBody }
        })
      }
    });
    return customFunctions;
  }

  public set CustomFunctions(v : any[]) {
    const customFunctionTemplates = constant.customFunctions[this.type];
    if(!customFunctionTemplates) return;

    // Remove existing key events first
    customFunctionTemplates.map(({name}) => {
      delete this.template.templateOptions[name];
    })

    v.map(func => {
      const funcDetail = func.func;
      this.template.templateOptions[funcDetail.key] = funcDetail.value;
    })
  }


  public get Hooks(): any[] {
    if(this.template.hooks) {
      const hooks = [];
      Object.entries(this.template.hooks).map(([name, body], index) => {
        hooks.push({ hook: { key: name, value: body } })
      })
      return hooks;
    } else {
      return null;
    }
  }

  public set Hooks(v : any[]) {
    if(!v || v.length === 0) {
      delete this.template['hooks'];
      return;
    }
    const hooks = {

    };
    v.map(hook => {
      const hookContent = hook.hook;
      hooks[hookContent.key] = hookContent.value;
    })
    this.template['hooks'] = hooks;
  }

  public get Selected() : boolean {
    return this.template['selected']
  }

  public set Selected(v : boolean) {

    if(v) {
      this.template['className'] += this.selectClassName;
    } else {
      this.template['className'] = this.template['className'].replace(this.selectClassName, "");
    }
    this.template['selected'] = v
  }

  public get Expressions() : string {
    return this.template.expressionProperties;
  }

  public set Expressions(v : any) {
    if(!v || Object.keys(v).length === 0) {
      delete this.template['expressionProperties']
    } else {
      this.template['expressionProperties'] = v;
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public get ClassName() : string {
    if(this.Selected) {
      return this.template.className.replace(this.selectClassName, '');
    } else return this.template.className
  }

  public set ClassName(v : string) {
    this.template.className = v;
  }

  public clearValidators() {
    const formmodel = this.template['validators'];
    if(formmodel == undefined)
      return;
    let index=0;
    do {
      if(formmodel.length<1)
        return;

      let findex = -1;
      try {
        findex = constant.customValidationFields.findIndex((element)=>formmodel[index]['name'] == element);
      } catch (e) {
        console.log(e)
      }
      if(formmodel[index] == null || findex >-1)
      {
        formmodel.splice(index,1);
        continue;
      }
      if(index==formmodel.length-1)
         return;
      index++;
    } while(1);
  }

  public filterCustomValidators():any[]{
    const formmodel = this.template['validators'];
    const result=[];
    if(formmodel == undefined)
      return result;

    this.template['validators'].map((validator)=>{
      if(constant.customValidationFields.findIndex((element)=>validator['name'] == element) > -1)
      {
        result.push(validator);
      }
    });

    return result;
  }
  public get Validators() : any[] {
    return this.template.validators
  }

  public set Validators(v: any[]) {
    this.template['validators'] = v;
  }


}
