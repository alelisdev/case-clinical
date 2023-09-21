/* eslint-disable @typescript-eslint/ban-types */
import { ActivatedRoute } from '@angular/router';
import { Renderer2, ElementRef, Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, TemplateRef , ViewEncapsulation, Injectable, Inject,} from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { FormGroup, NgForm } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions,  } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { KeyEvents, customFunctions } from './form-designer/constants';
import { selectFormVariants } from './select-form-variants';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { transpile } from 'typescript';
import { FormLayout, WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormService } from '@case-clinical/web/ui/form';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { WebAuthStore } from '@case-clinical/web/auth/data-access';
import { gridVariants } from './grid-variants';
import { isString } from 'lodash';
import { webFormVariants } from './web-form-variants';
import * as _moment from 'moment';
import { FormRouterKeyService } from './services/form-routerkey.service';
import { FormlyJsonFormViewsStore } from './formly-json-form-views.store';

@Component({
  selector: 'ui-formly-json-form',
  styleUrls: ['./web-ui-formly-json-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
      <div *ngIf="loggedIn" class="hidden absolute top-0 z-[999] right-0 md:flex flex-col rounded gap-2">
        <button type='button' mat-icon-button [matMenuTriggerFor]="userActions">
            <ui-la-icon icon="las cog" class="bg-primary rounded-full cursor-pointer z-99999 hover:shadow-md p-1"></ui-la-icon>
        </button>

        <mat-menu [xPosition]="'before'" #userActions="matMenu">
          <button mat-menu-item [matMenuTriggerFor]="forms">
            <span>1. Edit this page</span>
          </button>
          <mat-divider class="my-2"></mat-divider>
          <button (click)="openDialog(componentDesigner)" mat-menu-item>
            <span>2. Templates</span>
          </button>
          <mat-divider class="my-2"></mat-divider>
          <button mat-menu-item (click)="openDialog(componentDesigner, 'Component')">
            <span>3. Custom Components</span>
          </button>
          <mat-divider class="my-2"></mat-divider>
          <button mat-menu-item (click)="openDialog(componentDesigner, 'Wrapper')">
            <span>4. Custom Wrappers</span>
          </button>
        </mat-menu>
      </div>

      <mat-menu #forms="matMenu">
        <div *ngFor="let childLayout of childrenFormLayouts" class='flex flex-row items-center justify-start gap-2 p-2'>
          <span class='flex-1 font-bold'>{{ childLayout.order === -1 ? '' :  childLayout.order + '. ' }}{{ childLayout.title }}</span>
          <button (click)="openDialog(designer,'', parseFormLayout(childLayout))" class="text-green-500 cursor-pointer z-99999 hover:shadow-md">
            <ui-la-icon title='Edit Template' icon="las cog" size='2x'></ui-la-icon>
          </button>
          <button (click)="openSmallDialog(childEditTpl, childLayout)" class="text-sky-500 cursor-pointer z-99999 hover:shadow-md">
            <ui-la-icon title='Edit Information' icon="lar edit" size='2x'></ui-la-icon>
          </button>
          <button *ngIf="childLayout.order !== -1" (click)="deleteChildForm(childLayout.id)" class="text-red-500 cursor-pointer z-99999 hover:shadow-md">
            <ui-la-icon title='Delete' icon="las trash" size='2x'></ui-la-icon>
          </button>
        </div>
        <button (click)="openSmallDialog(childCreateTpl)" mat-menu-item>
          <span class="text-red-500 font-bold">+ Add New</span>
        </button>
      </mat-menu>

      <ui-formly-form-select *ngIf="showFormSelector && formName && childrenFormLayouts?.length > 1" [formName]="formName"></ui-formly-form-select>

      <div *ngIf="schema?.length === 0" class='w-full h-0.5'></div>
      <div *ngIf="!loading" class="w-full flex-1 relative">
        <ui-context-provider [data]="ContextData" [formName]="formName">
          <form #ngForm [formGroup]="form" (ngSubmit)="submit($event)" *ngIf="fields" class="relative">
            <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form" class="w-full"></formly-form>
            <button *ngIf="showSubmitButton" #SubmitButton mat-flat-button type="submit" class="bg-blue-600 rounded-md mt-2 text-white py-5 px-6" [disabled]="!this.form.valid">Save</button>
          </form>
        </ui-context-provider>
      </div>
      <ng-template #designer let-ref>
        <ui-formly-designer
          *ngIf="!formConfigs && !viewOnly"
          [schema]="ref.data.layout.schema"
          [testData]="ref.data.layout.testData"
          [modelData]="ref.data.layout.modelData"
          [customLayouts]="ref.data.layout.customLayouts"
          [routerKeys]="ref.data.layout.routerKeys"
          [submitAction]="ref.data.layout.submitAction"
          (schemaDidChange)="schemaDidChange(ref.data.layout.id, $event)"
          class="w-full h-full"
        ></ui-formly-designer>
      </ng-template>

      <ng-template #childCreateTpl let-ref>
        <ui-child-form-create (submitAction)="createChildForm($event, ref)" [edit]=false></ui-child-form-create>
      </ng-template>

      <ng-template #childEditTpl let-ref>
        <ui-child-form-create [model]="ref.data?.childLayout" (submitAction)="editChildForm($event, ref)" [edit]=true></ui-child-form-create>
      </ng-template>

      <ng-template #componentDesigner let-ref>
       <ui-web-template-designer (close)="ref.close()" [type]="ref?.data?.type ?? 'Template'" class="w-full h-full"></ui-web-template-designer>
      </ng-template>
    `,
    providers: [FormRouterKeyService]
})
export class WebUiFormlyJsonFormComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('SubmitButton', {read: ElementRef, static: false}) submitButton: ElementRef;
  @ViewChild('ngForm') ngForm!: NgForm;

  @Input() formName;
  @Input() showFormSelector = false;
  @Input() formConfigs = null;
  @Input() showSubmitButton = true;
  @Input() viewOnly = false;
  @Input() formData = {};     // Form's extra data { key: any | Promise<any> }
  @Input() model = {};        // Form's input values
  @Input() componentStore = {}
  @Input() resetForm = false;
  @Output() save = new EventEmitter()
  @Output() ngSubmit = new EventEmitter<any>();
  @Output() formIsReady = new EventEmitter<any>();

  formLayoutId;
  form = new FormGroup({});

  private _unsubscribeAll: Subject<any> = new Subject<any>()

  loggedIn = false;
  loading = false;
  submitting = false;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  // eslint-disable-next-line @typescript-eslint/ban-types
  submitFunc: Function;
  globalKeyListenFunc?: Function;
  schema = ""
  testData = ""
  submitAction = null;
  routerKeys = []
  hasRouterKey = {}

  customLayouts = {}

  childrenFormLayouts = [];
  childFormLayoutIndex = -1;

  store = null

  slots = [];

  public get ContextData(): any {
    return { ...this.formData, ...this.model }
  }

  constructor(
    private changeDetectRef: ChangeDetectorRef,
    private data: WebCoreDataAccessService,
    private formlyJsonschema: FormlyJsonschema,
    private readonly toast: WebUiToastService,
    private readonly router: ActivatedRoute,
    private readonly dialog: DialogService,
    public formService: FormService,
    private fuseLoadingService: FuseLoadingService,
    private renderer: Renderer2,
    @Inject('moment') private moment,
    private authStore: WebAuthStore,
    public formRouterKeyService: FormRouterKeyService,
    private formlyJsonFormViewsStore: FormlyJsonFormViewsStore,
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let hadChange = false

    if (changes.model?.currentValue && changes.model?.previousValue === undefined) {
      this.model = changes.model?.currentValue
      if (this.routerKeys.length > 0) {
        this.routerKeys.map((key) => {
          const routerValue = this.router.snapshot.params[key];
          if(routerValue)
            this.model[key] = routerValue;
        })
      }
      hadChange = true
    }

    if (changes.componentStore?.currentValue && changes.componentStore.previousValue === undefined) {
      if(this) this.store = changes.componentStore.currentValue
    }
    // if(changes.formData?.currentValue && changes.formData?.previousValue === undefined) {
    //   this.formData = changes.formData?.currentValue
    // }

    if (hadChange) {
      //this.loadExample()
    }
  }

  ngOnInit(): void {
    if(this.formData) this.formData['store'] = this.componentStore;

    this.fuseLoadingService.show$.pipe(takeUntil(this._unsubscribeAll)).subscribe((loading) => {
      if(!loading) {
        setTimeout(() => { this.submitting = false; }, 500);
      } else {
        this.submitting = true;
      }
    })
    this.authStore.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    })

    this.loadExample();
    this.globalKeyListenFunc = this.renderer.listen('document', 'keypress', e => {
      if(e.keyCode == 13 && this.submitButton.nativeElement && (e.srcElement as HTMLElement).tagName.toLowerCase() !=="textarea")
      {
        const bDisabled = this.submitButton.nativeElement.disabled;
        this.submitButton.nativeElement.disabled = (bDisabled? false : bDisabled)
        this.submitButton.nativeElement.formControl.submit();
        this.submitButton.nativeElement.disabled = bDisabled;
      }
    });
    if (!this.model) this.model = {}

    this.formlyJsonFormViewsStore.getCurrentViewId(this.formName).pipe(takeUntil(this._unsubscribeAll)).subscribe((viewId) => {
      if(this.formLayoutId !== viewId) {
        this.childFormDidSelect(viewId);
      }
    })
  }

  ngOnDestroy(): void {
    this.saveFormLayoutCache();
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete();
    if(this.globalKeyListenFunc) this.globalKeyListenFunc();
    this.formRouterKeyService.destroy();
  }

  openDialog(
    tpl: TemplateRef<any>,
    type: string = undefined,
    layout: FormLayout = {},

  ) {
    this.dialog.open(tpl, { data: { type: type ?? 'Template', layout }, width: '100%', height: '100%', closeButton: false, enableClose: false })
  }

  openSmallDialog(
    tpl: TemplateRef<any>,
    childLayout = {},
  ) {
    console.log(childLayout);
    this.dialog.open(tpl, { data: { childLayout }, closeButton: false})
  }

  loadExample() {
    this.options = {
      formState: this.formData ? { ...this.formData, formName: this.formName } : {}
    };
    if (this.formConfigs) {
      this.fields = this.initializeFieldConfigs(this.formConfigs, this.customLayouts);
    } else
      this.loadSchema();
  }

  displayModel() {
    alert(JSON.stringify(this.model));
  }

  loadSchema() {
    if (this.formName) {
      this.loading = true;
      this.data.getFormLayout(this.formName).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        layout => {
          this.loading = false;
          if (layout) {
            if(layout.children?.length > 0) {
              layout.children.map((childLayout) => this.childrenFormLayouts.push(childLayout));
            }

            delete layout['children'];
            this.childrenFormLayouts.unshift({
              ...layout,
              order: -1,
              title: layout.title ?? 'Main'
            });
            this.childrenFormLayouts = this.childrenFormLayouts.sort((a, b) => a.order - b.order);
            this.formlyJsonFormViewsStore.setViews({ formName: this.formName, views: this.childrenFormLayouts.map((el) => ({ id: el.id, title: el.title })) });

            this.childFormDidSelect(layout.id);
            this.saveFormLayoutCache();
          }
        }
      )
    }
  }

  saveFormLayoutCache() {
    // Find Main Layout
    const mainLayoutIndex = this.childrenFormLayouts.findIndex((el) => el.name);

    const formLayout = {
      ...this.childrenFormLayouts[mainLayoutIndex],
      children: []
    }
    for(let i = 0; i < this.childrenFormLayouts.length; i++) {
      if(i !== mainLayoutIndex)
        formLayout.children.push(this.childrenFormLayouts[i]);
    }
    console.log(formLayout);
    this.data.updateFormLayoutCache(formLayout)
  }

  schemaDidChange(formLayoutId: string, { schema, submitAction, routerKeys, testData, modelData }) {
    console.log('formly json form component: modelData = ', modelData);
    this.data.userUpdateChildForm({ input: {
      formLayoutId,
      config: JSON.stringify({ schema: JSON.stringify(schema), submitAction: submitAction, routerKeys: routerKeys,}),
      testData,
      modelData,
    } }).pipe(catchError(error => { this.toast.error('Failed to update child form'); return EMPTY; }))
    .subscribe((response) => {
      this.toast.success('Successfully saved child form');
      this.childrenFormLayouts = this.childrenFormLayouts.map((childLayout) => {
        const { id } = childLayout;
        if(id === formLayoutId) return response.data.layout;
        else return childLayout;
      });
      this.saveFormLayoutCache();
      if(formLayoutId === this.formLayoutId) this.childFormDidSelect(formLayoutId);
    });
  }

  showModel() {
    alert(JSON.stringify(this.model))
  }

  submit() {
    if(this.submitting) return;

    if(this.form.valid) {
      const blackList = ['__typename', 'createdAt', 'updatedAt'];
      const submitData = {}

      const inputErrorMsg = "Input value length should be between 2 and 256";
      const textAreaErrorMsg = "TextArea value length should be less than 1000";
      let errorType = "";

      Object.keys(this.model).map((key) => {
        const value = isString(this.model[key]) ? this.model[key]?.trim() : this.model[key];
        if(isString(this.model[key]))
        this.model[key]  = this.model[key].trim();
        if (!blackList.includes(key) && this.model[key] !== null && !Array.isArray(this.model[key])) {
          const keyTypeInfexInFields = this.fields.findIndex( (value)=>{
           if(value?.key == key) return true;
           else return false;
          });

          if( keyTypeInfexInFields !== -1){
            switch(this.fields[keyTypeInfexInFields]?.type.toString().toUpperCase()){
              case 'TEXTAREA':
                if(this.model[key]?.length > 1000){
                  errorType = "area";
                  submitData[key] = value.substring( 0, 1000);
                  this.model[key] = value.substring( 0, 1000);
                }
                else submitData[key] = value;
                break;
              case 'INPUT':
              case 'STRING':
                if(this.model[key]?.length > 0 && ( this.model[key]?.length > 256 || this.model[key]?.length < 2)){
                  errorType = "input";
                }
                if(this.model[key]?.length > 256){
                  submitData[key] = value.substring( 0, 256);
                  this.model[key] = value.substring( 0, 256);
                }
                else submitData[key] = value;
                break;
              case 'ADDRESS-PICKER':
                submitData[key] = value.formatedAddress;
                this.model[key] = value.formatedAddress;
                break;
              default:
                submitData[key] = value;
            }
          }else{
            submitData[key] = value;
          }
        }
      })

      switch(errorType){
        case "input":
          this.toast.error(inputErrorMsg, { duration: 3000 })
          return
          break;
        case "area":
          this.toast.error(textAreaErrorMsg, { duration: 3000 })
          return
          break;
      }
      if (this.submitFunc) {
        this.submitFunc(submitData)
      } else {
        this.save.emit(submitData);
      }
    }
  }

  createChildForm($event, ref) {
    const { title, order } = $event;
    this.data.userCreateChildForm({ input: { parentName: this.formName, parentId: this.formLayoutId, title, order } }).pipe(catchError(error => {
      this.toast.error('Faled to create new child form');
      return EMPTY;
    })).subscribe((response) => {
      this.toast.success('Succesfully created new child form');
      this.childrenFormLayouts.push(response.data.layout);
      console.log(response.data.layout);
      this.childrenFormLayouts = this.childrenFormLayouts.sort((a, b) => a.order - b.order);
      this.formlyJsonFormViewsStore.setViews({ formName: this.formName, views: this.childrenFormLayouts.map((el) => ({ id: el.id, title: el.title })) });
      ref?.close();
      this.saveFormLayoutCache();
    })
  }

  editChildForm($event, ref) {
    const { title, order, id } = $event;
    this.data.userUpdateChildForm({ input: { formLayoutId: id, title, order } }).pipe(catchError(error => {
      this.toast.error('Failed to update child form');
      return EMPTY;
    })).subscribe((response) => {
      this.toast.success('Succesfully updated child form');
      this.childrenFormLayouts = this.childrenFormLayouts.map((childLayout) => {
        const { id } = childLayout;
        if(id === response.data.layout.id) return response.data.layout;
        else return childLayout;
      }).sort((a, b) => a.order - b.order);
      this.formlyJsonFormViewsStore.setViews({ formName: this.formName, views: this.childrenFormLayouts.map((el) => ({ id: el.id, title: el.title })) });
      this.saveFormLayoutCache();
      ref?.close();
    })
  }

  deleteChildForm(layoutId: string) {
    if(confirm("Are you sure you want to delete?")){
      this.data.userDeleteChildForm({ formId: layoutId }).pipe(catchError(error => { this.toast.error('Failed to delete child form'); return EMPTY; }))
      .subscribe((response) => {
        this.toast.success('Successfully deleted view');
        this.childrenFormLayouts = this.childrenFormLayouts.filter((el) => el.id !== response.data.formId);
        this.formlyJsonFormViewsStore.setViews({ formName: this.formName, views: this.childrenFormLayouts.map((el) => ({ id: el.id, title: el.title })) });
        this.saveFormLayoutCache();
      });
    }
  }

  parseFormLayout(layout: FormLayout) {
    const formConfig = layout.config ? JSON.parse(layout.config) : {};
    const testData = layout.testData;
    const modelData = layout.modelData;
    const schema = formConfig['schema'];
    const submitAction = formConfig['submitAction'];
    const routerKeys = formConfig['routerKeys'] ?? [];
    const formLayoutId = layout.id;
    const customLayouts = layout.customLayouts ? JSON.parse(layout.customLayouts) : {};
    return {
      schema, testData, modelData, routerKeys, submitAction, customLayouts, id: formLayoutId
    }
  }

  childFormDidSelect(layoutId: any) {
    const layout = this.childrenFormLayouts.find((el) => el.id === layoutId);
    if(!layout) return;

    const { testData, schema, submitAction, routerKeys, id, customLayouts } = this.parseFormLayout(layout);

    this.formlyJsonFormViewsStore.setCurrentViewId({ formName: this.formName, currentViewId: layoutId });
    this.formLayoutId = id;
    this.testData = testData;
    this.schema = schema;
    this.submitAction = submitAction;
    this.routerKeys = routerKeys;
    this.customLayouts = customLayouts;

    if (this.submitAction) {
      try {
        const _submitFunc = this.evaluate(this.submitAction);
        if (_submitFunc instanceof Function)
          this.submitFunc = _submitFunc;
      } catch (err) {
        console.error('Failed to evaluate submit function')
      }
    }

    if (this.routerKeys.length > 0) {
      this.routerKeys.map((key) => {
        if(this.router.snapshot.params[key]) {
          this.hasRouterKey[key] = true;
          const routerValue = this.router.snapshot.params[key];
          if(this.model) this.model[key] = routerValue;
        }
      })
    }

    const fields = this.schema ? JSON.parse(this.schema) : [];
    this.fields = this.initializeFieldConfigs(fields, this.customLayouts)
    this.formIsReady.emit();
    this.changeDetectRef.detectChanges();
  }

  evaluate(statement: string) {
    try {
      const evaluatedResult = eval(transpile(statement));
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

    if(this.routerKeys.includes(field.key) && this.hasRouterKey[String(field.key)]) {
      return null;
    };

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

    // Do modification for select-form form fields
    if (field.type === 'select-form') {
      const variant = field.templateOptions['variant'];
      if (!selectFormVariants.includes(variant)) {
        // this.toast.error(`selectForm named ${variant} does not exist, we ignore this field`)
        // return null;
        field.type = 'paragraph';
        field.templateOptions['html'] = `<span style="border: 1px solid red; border-radius: 10px; padding: 5px;">Not found ${variant}-select</span>`;
        field.className += " flex items-center px-4 font-bold text-lg text-red-900 italic";
        field.wrappers = ['form-field']
      } else {
        field.type = `${field.templateOptions['variant']}-select`;
        delete field.templateOptions['variant'];
      }
    }


    // Do modification for web-form form fields
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

    if (field.wrappers?.length > 0 && field.wrappers.includes('overview-header')) {
      const deleteAction = this.evaluate(field.templateOptions.submitAction);
      if (deleteAction instanceof Function) {
        field.templateOptions.submitAction = deleteAction.bind(this);
      }
    }

    // Custom Functions
    let fieldType = field.type;
    if(!fieldType && field.wrappers?.length > 0) {
      fieldType = field.wrappers[0];
    }
    if(fieldType && fieldType.endsWith('select') && fieldType !== 'multi-select') fieldType = 'select-form';
    if(fieldType && fieldType.endsWith('form')) fieldType = 'web-form';

    if(fieldType) {
      const _customFunctions = customFunctions[fieldType] ?? []

      if(fieldType === 'button') {
        if(field.templateOptions['submitButton']) {
            field.templateOptions['submitAction'] = this.evaluate(String(`() => { this.save.emit(this.model); if(this.resetForm) this.model = {}; }`))
        }
      }
      _customFunctions.map(({ name }) => {
        if (field.templateOptions[name] && !(field.templateOptions[name] instanceof Function)) {
          const customFunc = this.evaluate(String(field.templateOptions[name]));
          field.templateOptions[name] = customFunc;
        }
      })
    }

    // ExpressionProperties
    if (field.expressionProperties) {
      const evaluatedExpressions = {}
      Object.entries(field.expressionProperties).map(([key, value], index) => {
        console.log("value",value,"key",key);
        if (value instanceof Function) {
          evaluatedExpressions[key] = value;
        } else {
          const func = this.evaluate(String(value));
          if (func instanceof Function) {
            evaluatedExpressions[key] = func;
          } else {
            evaluatedExpressions[key] = value;
          }
        }
      });
      console.log("EvaluatedExpressions", evaluatedExpressions)
      field.expressionProperties = evaluatedExpressions;
    }

    // Hooks
    if (field.hideExpression) {
      const func = this.evaluate(String(field.hideExpression));
      if (func instanceof Function) {
        field.hideExpression = func;
      }
    }
    if (field.hooks) {
      const evaluatedHooks = {}
      Object.entries(field.hooks).map(([name, body], index) => {
        // If this is originally function, no need to parse
        if (body instanceof Function) {
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
      if (field.templateOptions && field.templateOptions[keyeventName] && !(field.templateOptions[keyeventName] instanceof Function)) {
        const keyeventFunc = this.evaluate(String(field.templateOptions[keyeventName]));
        field.templateOptions[keyeventName] = keyeventFunc;
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
    if (!fieldGroup) {
      fieldGroup = field.fieldGroup;
    }

    if (fieldGroup && fieldGroup.length > 0) {
      const fields = fieldGroup.map(field => {
        return this.mapField(field, customLayouts);
      }).filter(el => el)
      if (usingFieldArray) {
        field.fieldArray.fieldGroup = fields
      } else {
        field.fieldGroup = fields;
      }
    }
    return field;
  }
}
