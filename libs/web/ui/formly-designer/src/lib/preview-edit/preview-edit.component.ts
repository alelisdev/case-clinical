import { GridApi, RowNode } from '@ag-grid-community/core';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Entity } from '../Entity';
import { FormGroup } from '@angular/forms';
import { WebUiFormField } from '@case-clinical/web/ui/form';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebUiFieldsTreeComponent } from './fields-tree.component';
import { WebTemplateDesignerStore } from '../web-template-designer/web-template-designer.store';

@Component({
  providers: [WebTemplateDesignerStore],
  styleUrls: ['./preview-edit.component.scss'],
  template: `
    <as-split (dragStart)="showIframeHider = true" (dragEnd)="showIframeHider = false" [useTransition]="true" direction="horizontal" [unit]="'pixel'" class="w-full flex-1 flex flex-row">
      <as-split-area [order]="0" [size]="256"  *ngIf="showToolbox" >
        <div class='transition-width ease-out duration-75' [ngClass]="{'h-full w-full':true}">
          <ui-formly-tool-box *ngIf="gridApi" [gridClassName]="gridClassName" (onGridReady)="onToolboxGridReady($event)"></ui-formly-tool-box>
        </div>
      </as-split-area>

      <as-split-area [size]="256"  [order]="1" *ngIf="showHierachy" >
        <div class='transition-width ease-out h-full w-full duration-75'>
          <ui-fields-tree (orderChanged)="orderChanged($event)" [canMove]="canPlaceFormField.bind(this)" (fieldSelected)="fieldSelected($event)" (onGridReady)="rightGridReady($event);gridApi=$event.api;onGridReady.emit($event)" [gridClassName]="gridClassName" class='w-full h-full'></ui-fields-tree>
        </div>
      </as-split-area>

      <as-split-area [order]="2" >
        <div class='flex-1 h-full w-full bg-gray-100 dark:bg-gray-900 overflow-hidden p-2 flex flex-col'>
          <div class='flex flex-row items-center gap-4 text-white'>
            <button mat-icon-button [matMenuTriggerFor]="testDataEditActions">
              <ui-la-icon icon="cog" size="2x" class="text-gray-800 dark:text-gray-50 cursor-pointer"></ui-la-icon>
            </button>

            <mat-menu [xPosition]="'before'" #testDataEditActions="matMenu">
              <button (click)="openDialog(contextDataEditTpl)" mat-menu-item>
                <span>1. Edit Form Data</span>
              </button>
              <mat-divider class="my-2"></mat-divider>
              <button (click)="openDialog(modelDataEditTpl)" mat-menu-item>
                <span>2. Edit Model Data</span>
              </button>
            </mat-menu>

            <div class="flex-1"></div>
            <ui-la-icon icon="desktop" size="2x" (click)="breakPoint='lg'" class="text-gray-800 dark:text-gray-50 cursor-pointer"></ui-la-icon>
            <ui-la-icon icon="tablet" size="2x" (click)="breakPoint='md'" class="text-gray-800 dark:text-gray-50 cursor-pointer"></ui-la-icon>
            <ui-la-icon icon="mobile" size="2x" (click)="breakPoint='sm'" class="text-gray-800 dark:text-gray-50 cursor-pointer"></ui-la-icon>
            <div class="flex-1"></div>

            <button mat-icon-button [matMenuTriggerFor]="userActions">
              <ui-la-icon icon="file-import" size="2x" class="text-gray-800 dark:text-gray-50 cursor-pointer"></ui-la-icon>
            </button>

            <mat-menu [xPosition]="'before'" #userActions="matMenu">
              <button (click)="openDialog(importTpl)" mat-menu-item>
                <span>1. Import Code</span>
              </button>
              <mat-divider class="my-2"></mat-divider>
              <button (click)="openDialog(importTemplateTpl, true)" mat-menu-item>
                <span>2. Import Template</span>
              </button>
              <mat-divider class="my-2"></mat-divider>
              <button mat-menu-item (click)="openDialog(importTemplateTpl, true, 'Component')">
                <span>3. Import Custom Component</span>
              </button>
              <mat-divider class="my-2"></mat-divider>
              <button mat-menu-item (click)="openDialog(importTemplateTpl, true, 'Wrapper')">
                <span>4. Import Custom Wrapper</span>
              </button>
            </mat-menu>

            <ng-container *ngIf="CanBeSlot">
              <ui-button *ngIf="!IsSlot" type="button" (click)="makeAsSlot(true)" label="Make as slot">
              </ui-button>
              <ui-button type="button" *ngIf="IsSlot" (click)="makeAsSlot(false)" label="Cancel slot">
              </ui-button>
            </ng-container>

          </div>
          <div class="w-full  flex-1 flex flex-col p-1">
            <div [style]="getWidthStyle" class="flex-1 border-l-2 border-b-2 border-r-2 border-t-8 rounded-t shadow-md border-gray-800 dark:border-gray-100 m-auto">
              <div class="h-full relative overflow-hidden">
                  <div [hidden]="showIframeHider === false" class="hack-iframe-hider"></div>
                  <iframe id='previewiFrame' *ngIf="safeUrl" target="_parent" width="100%" height="100%" frameBorder="0" [src]="safeUrl"></iframe>
              </div>
            </div>
          </div>
        </div>
      </as-split-area>

      <as-split-area [size]="256" [order]="3"  *ngIf="showInspectBox" >
        <div class='p-2 h-full w-full flex flex-col transition-width gap-3 ease-in-out duration-75 bg-gray-100 dark:bg-gray-900'>
          <div *ngIf="entity" class='flex flex-row justify-between'>
            <ui-la-icon (click)="delete()" icon="trash" size="2x" class="cursor-pointer text-red-900"></ui-la-icon>
            <svg (click)="moveUp()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-gray-900 dark:text-gray-50">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
            </svg>
            <svg (click)="moveDown()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 w-6 h-6 cursor-pointer  text-gray-900 dark:text-gray-50">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            <ui-la-icon (click)="copy()" icon="copy" size="2x" class="cursor-pointer text-green-900"></ui-la-icon>
            <ui-la-icon (click)="openDialog(templateSaveTpl)" icon="save" size="2x" class="cursor-pointer text-green-900"></ui-la-icon>
          </div>
          <ui-field-properties *ngIf="entity" [model]="entity" (fieldChanged)="fieldChanged($event)" class='w-full flex-1 overflow-scroll no-scrollbar'></ui-field-properties>
        </div>
      </as-split-area>
    </as-split>

    <ng-template #contextDataEditTpl let-ref>
      <div class='bg-card p-4'>
        <h1 class='text-xl text-black dark:text-white font-bold mb-3'>Change context data to preview</h1>
        <form (ngSubmit)="testDataFormSubmit();ref.close()" class="relative w-full">
          <formly-form [model]="contextDataFormModel"  [fields]="contextDataFormfields" class="mb-3"></formly-form>
          <ui-button [label]="'Save'" type="submit" ></ui-button>
          <ui-button class='ml-4' (click)="ref.close()" [label]="'Close'" type="button" ></ui-button>
        </form>
      </div>
    </ng-template>

    <ng-template #modelDataEditTpl let-ref>
      <div class='bg-card p-4'>
        <h1 class='text-xl text-black dark:text-white font-bold mb-3'>Change model data to preview</h1>
        <form (ngSubmit)="modelDataFormSubmit();ref.close()" class="relative w-full">
          <formly-form [model]="modelDataFormModel"  [fields]="modelDataFormfields" class="mb-3"></formly-form>
          <ui-button [label]="'Save'" type="submit" ></ui-button>
          <ui-button class='ml-4' (click)="ref.close()" [label]="'Close'" type="button" ></ui-button>
        </form>
      </div>
    </ng-template>

    <ng-template #templateSaveTpl let-ref>
      <div class='bg-card p-8'>
        <h1 class='text-xl text-black dark:text-white font-bold mb-3'>Please input template name to save</h1>
        <form [formGroup]="templateSaveForm" (ngSubmit)="saveAsTemplate(ref);" class="relative w-full">
          <formly-form [model]="templateSaveFormModel" [form]="templateSaveForm" [fields]="templateSaveFormFields" class="mb-3"></formly-form>
          <ui-button [label]="'Save'" type="submit" ></ui-button>
          <ui-button class='ml-4' (click)="ref.close()" [label]="'Close'" type="button" ></ui-button>
        </form>
      </div>
    </ng-template>

    <ng-template #importTpl let-ref>
      <ui-config-import (didImport)="configDidImport($event);ref.close()" (didClose)="ref.close()"></ui-config-import>
    </ng-template>

    <ng-template #importTemplateTpl let-ref>
      <ui-web-template-designer [type]="ref?.data?.type" (close)="ref.close()" (templateDidSelect)="templateDidSelect($event);ref.close()" class="w-full h-full" [readonly]="true"></ui-web-template-designer>
    </ng-template>

  `,
  selector: 'ui-preview-edit',
})
export class PreviewEditComponent implements OnInit {
  @Input() type: 'Template' | 'Component' | 'Wrapper' = 'Template';
  @Input() gridClassName: string;
  @Input() schema: string;
  @Input() testData: string;
  @Input() modelData: string;
  @Input() customLayouts: any = {};
  @Output() customLayoutsDidChange = new EventEmitter();
  @Output() testDataDidChange = new EventEmitter()
  @Output() modelDataDidChange = new EventEmitter()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onGridReady = new EventEmitter<any>

  @ViewChild(WebUiFieldsTreeComponent) fieldsTreeComponent: WebUiFieldsTreeComponent

  showIframeHider = false;
  breakPoint = 'lg';

  showToolbox = true;
  showInspectBox = true;
  showHierachy = true;

  leftApi: any;
  gridApi: any;

  currentNode: RowNode;
  prevFocusedEntity: Entity
  entity: Entity
  form: any = new FormGroup({})
  templateSaveForm: any = new FormGroup({})
  safeUrl: SafeResourceUrl
  currentIndex = 0;

  contextDataFormModel = {
    contextTestData: {}
  }

  modelDataFormModel = {
    modelTestData: {}
  }

  templateSaveFormModel = {

  }

  contextDataFormfields = [
    WebUiFormField.jsonEditor('contextTestData', { required: false }, { className: 'w-full' })
  ]

  modelDataFormfields = [
    WebUiFormField.jsonEditor('modelTestData', { required: false }, { className: 'w-full' })
  ]

  templateSaveFormFields = [
    WebUiFormField.input('name', { label: 'Template Name', required: true }, { className: 'w-full' })
  ]

  public get IsSlot(): boolean {
    return this.entity?.Slot;
  }

  public get CanBeSlot(): boolean {
    return this.type === 'Wrapper' && this.entity && this.entity.IsWrapper;
  }


  constructor(
    private dialog: DialogService,
    public sanitizer: DomSanitizer,
    private toast: WebUiToastService,
    private store: WebTemplateDesignerStore,
  ) { }

  // This is useful to receive message from child iframe
  @HostListener('window:message',['$event'])
  onMessage(e)
  {
    if (e.origin !== window.origin)
    {
      return false;
    }
    const { from, status } = e.data;
    // If child iframe is ready, then send form configs to show
    if(from === 'preview' && status === 'available') {
      let testData = {}
      let modelData = {}
      try {
        testData = JSON.parse(this.testData);
      } catch (e) {
        console.error(e?.message?.toString());
      }

      try {
        modelData = JSON.parse(this.modelData);
      } catch (e) {
        console.error(e?.message?.toString());
      }

      this.postDataToIFrame({
        schema: this.schema,
        customLayouts: this.customLayouts,
        testData,
        modelData,
      })
    }
    if(from === 'preview' && status === 'modelChanged') {
      const { model } = e.data;
      this.modelDataFormModel.modelTestData = model;
      this.modelDataDidChange.emit(JSON.stringify(model));
    }
  }

  postDataToIFrame(data: any = {}) {
    const iframe = document.getElementById('previewiFrame');
    if (iframe == null) return;
    const iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    iWindow.postMessage({ previewData: true, data }, window.origin);
  }

  ngOnInit() {
    const url = `${window.location.origin}/preview/preview_form_config`
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    if (this.testData && this.testData.length > 0) {
      try {
        this.contextDataFormModel.contextTestData = JSON.parse(this.testData);
      } catch (e) {
        console.error('invalid forn test context data')
      }
    }

    if (this.modelData && this.modelData.length > 0) {
      try {
        this.modelDataFormModel.modelTestData = JSON.parse(this.modelData);
      } catch (e) {
        console.error('invalid forn test context data')
      }
    }
  }

  templateDidSelect({ name, config, type, customLayouts }) {
    console.log({ customLayouts })
    switch (type) {
      case 'Template':
        this.configDidImport(config);
        this.customLayouts[name] = config;
        if (customLayouts)
          this.customLayouts = { ...this.customLayouts, ...customLayouts }
        this.updateCustomLayouts();
        break;
      case 'Component':
        this.importComponent(name, config, customLayouts);
        break;
      case 'Wrapper':
        this.importWrapper(name, config, customLayouts);
        break;
      default:
        break;
    }
  }

  public get getWidthStyle(): string {
    switch (this.breakPoint) {
      case 'lg':
        return "width: 100%";
      case 'md':
        return `width: 768px; margin: auto`;
      case 'sm':
        return 'width: 390px; margin: auto'
      default:
        return "width: 100%"
    }
  }

  onToolboxGridReady(params: any) {
    this.leftApi = params.api;
    this.addDropzone();
  }

  refreshForm() {
    this.postDataToIFrame({
      schema: this.schema
    })
  }

  testDataFormSubmit() {
    this.postDataToIFrame({
      testData: this.contextDataFormModel.contextTestData
    })
    this.testDataDidChange.emit(JSON.stringify(this.contextDataFormModel.contextTestData))
  }

  modelDataFormSubmit() {
    this.postDataToIFrame({
      modelData: this.modelDataFormModel.modelTestData
    })
    this.modelDataDidChange.emit(JSON.stringify(this.modelDataFormModel.modelTestData))
  }

  updateCustomLayouts() {
    this.postDataToIFrame({
      customLayouts: this.customLayouts
    })
    this.customLayoutsDidChange.emit(this.customLayouts);
  }

  makeAsSlot(allow: boolean) {
    if (!allow) {
      this.toast.success('Canceled slot');
      this.entity.Slot = false;
      return;
    }

    if (this.currentNode.childrenAfterGroup?.length > 0) {
      this.toast.error('Only empty wrappers can be slot');
    } else {
      this.entity.Slot = true;
      this.toast.success('Made as slot');
    }
  }

  openDialog(
    tpl: TemplateRef<any>,
    fullscreen = false,
    type = 'Template',
  ) {
    if (fullscreen) {
      this.dialog.open(tpl, { data: { type }, closeButton: false, width: '100%', height: '100%' })
    } else {
      this.dialog.open(tpl, { data: { type }, closeButton: false, minHeight: '200px' })
    }
  }


  analyzeSchema(schema: any[]) {
    return this.analyzeChildSchema(schema, null)
  }

  configDidImport(config) {
    if (!config || config.length === 0) return;

    let schemaData = config ? JSON.parse(config) : []
    if (!Array.isArray(schemaData)) schemaData = [schemaData]

    const tableData = this.analyzeSchema(schemaData)
    this.gridApi.applyTransaction({ add: tableData })

    const _schema = this.getFormConfig();
    this.schema = JSON.stringify(_schema);
    this.refreshForm();
  }

  importComponent(name, config, customLayouts) {
    let schemaData: any = {
      type: "custom-component",
      name: name,
      templateOptions: {
      },
      "className": "w-full",
    }

    if (!Array.isArray(schemaData)) schemaData = [schemaData]
    const tableData = this.analyzeSchema(schemaData)
    this.gridApi.applyTransaction({ add: tableData })

    const _schema = this.getFormConfig();
    this.schema = JSON.stringify(_schema);
    this.refreshForm();

    this.customLayouts[name] = config;
    if (customLayouts)
      this.customLayouts = { ...this.customLayouts, ...customLayouts }
    this.updateCustomLayouts();
  }

  importWrapper(name, config, customLayouts) {
    let schemaData: any = {
      type: "custom-wrapper",
      name,
      wrappers: [name],
      templateOptions: {
      },
      "className": "w-full",
    }

    if (!Array.isArray(schemaData)) schemaData = [schemaData]
    const tableData = this.analyzeSchema(schemaData)
    this.gridApi.applyTransaction({ add: tableData })

    const _schema = this.getFormConfig();
    this.schema = JSON.stringify(_schema);
    this.refreshForm();

    this.customLayouts[name] = config;
    if (customLayouts)
      this.customLayouts = { ...this.customLayouts, ...customLayouts }
    console.log({ customLayouts: this.customLayouts })
    this.updateCustomLayouts();
  }

  analyzeChildSchema(schema, parent) {
    let data = []
    schema.map((template, index) => {
      const entity = Entity.fromTemplate(template, String(this.currentIndex++), parent ? parent.id : null)
      data.push(entity)
      if (entity.IsWrapper) {
        const fields = entity.pushFieldGroup();
        if (fields) {
          const childs = this.analyzeChildSchema(fields, entity);
          data = data.concat(childs)
        }
      }
    })
    return data;
  }

  rightGridReady(params) {
    this.currentIndex = 0;
    const schemaData = this.schema ? JSON.parse(this.schema) : []
    const tableData = this.analyzeSchema(schemaData)
    params.api.applyTransaction({ add: tableData })
  }

  removeFromPath(node: RowNode, allRemovedNodes: any[]) {
    allRemovedNodes.push(node.data);
    if (node.childrenAfterGroup) {
      node.childrenAfterGroup.forEach((childNode: RowNode) => {
        this.removeFromPath(childNode, allRemovedNodes)
      })
    }
  }

  copy() {
    if (this.currentNode) {
      const nodesToDuplicate = []
      this.duplicate(this.currentNode, this.currentNode.parent?.data?.id ?? null, nodesToDuplicate);

      this.gridApi.applyTransaction({
        add: nodesToDuplicate
      });

      this.entity.Selected = true;
      this.gridApi.applyTransaction('update', [this.entity])

      const _schema = this.getFormConfig();
      this.schema = JSON.stringify(_schema);
      this.refreshForm();

      this.entity.Selected = false;
      this.gridApi.applyTransaction('update', [this.entity])
    }
  }

  duplicate(node, parentId: string, nodesToDuplicate: Entity[]) {
    const nodeToCopy = node;
    const cloned = nodeToCopy.data.clone(String(this.currentIndex), parentId);

    nodesToDuplicate.push(cloned);
    this.currentIndex += 1;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const me = this;
    if (node.childrenAfterGroup) {
      node.childrenAfterGroup.forEach(function (childNode) {
        me.duplicate(childNode, cloned.id, nodesToDuplicate)
      })
    }
  }

  delete() {
    if (this.currentNode) {
      const allRemovedNodes = []
      this.removeFromPath(this.currentNode, allRemovedNodes)

      // Select the next or before node automatically for user experience
      // If parent node has any children
      const parentNode = this.currentNode.parent;
      if (parentNode) {
        const siblings = parentNode.childrenAfterGroup;
        const siblingCount = siblings?.length;
        if (siblingCount > 1) {
          const currentNodeIndex = siblings.findIndex((node) => node.id === this.currentNode.id)
          switch (currentNodeIndex) {
            case 0:
              this.currentNode = siblings[1];
              break;
            case siblingCount - 1:
              this.currentNode = siblings[siblingCount - 2];
              break;
            default:
              this.currentNode = siblings[currentNodeIndex + 1];
              break;
          }
        } else {
          this.currentNode = parentNode;
        }
        this.currentNode.setSelected(true)
        this.entity = this.currentNode.data;
        this.prevFocusedEntity = null;
      } else {
        this.currentNode = null;
        this.entity = null;
        this.prevFocusedEntity = null;
      }

      this.gridApi.applyTransaction({ remove: allRemovedNodes })

      if (this.entity) {
        this.entity.Selected = true;
        this.gridApi.applyTransaction({ update: [this.entity] })
      }

      const _schema = this.getFormConfig();
      this.schema = JSON.stringify(_schema);
      this.refreshForm();

      if (this.entity) {
        this.entity.Selected = false;
        this.gridApi.applyTransaction({ update: [this.entity] })
      }
    }
  }

  orderChanged(refreshed: false) {
    if(!this.entity) return;

    this.entity.Selected = true;
    this.gridApi.applyTransaction({ update: [this.entity] })

    const _schema = this.getFormConfig();
    this.schema = JSON.stringify(_schema);
    this.refreshForm();

    this.entity.Selected = false;
    this.gridApi.applyTransaction({ update: [this.entity] })

    if (refreshed) {
      const currentNode = this.getNodeForEntity(this.entity);
      if (currentNode) {
        this.currentNode = currentNode;

        const rowNodesTobeExpanded = [];

        let parentNode = this.currentNode.parent;
        while (parentNode) {
          rowNodesTobeExpanded.push(parentNode);
          parentNode = parentNode.parent
        }
        console.log(`Row Nodes to be expanded is ${rowNodesTobeExpanded.length}`);
        rowNodesTobeExpanded.forEach((node) => {
          node.setExpanded(true);
        })

        this.currentNode.selectThisNode(true);
      }
    }
  }

  moveDown() {
    this.fieldsTreeComponent.moveDown(this.currentNode);
  }

  moveUp() {
    this.fieldsTreeComponent.moveUp(this.currentNode);
  }

  addDropzone() {
    const dropZoneParams = this.gridApi.getRowDropZoneParams({

      onDragStop: params => {
        const nodes = params.nodes;
        nodes?.forEach(function (node) {
          node.setSelected(false);
        });
        const overNode = params.overNode;
        let wrapperToDropInto = null;
        if (overNode) {
          wrapperToDropInto =
            overNode.data.IsWrapper
              ? // if over a wrapper, we take the immediate row
              overNode
              : // if over a field, we take the parent row (which will be a wrapper)
              (
                overNode.level === 0 ? null : overNode.parent
              );
        }

        const parentId = wrapperToDropInto ? wrapperToDropInto.data.id : null;
        const newEntity = Entity.fromTemplate(JSON.parse(params.node.data.template), String(this.currentIndex), parentId)

        if (this.canPlaceFormField(newEntity, wrapperToDropInto?.data)) {
          this.currentIndex += 1
          params.api.applyTransaction({
            add: [newEntity]
          });

          const _schema = this.getFormConfig();
          this.schema = JSON.stringify(_schema);
          this.refreshForm();
        }
      }
    });

    this.leftApi.addRowDropZone(dropZoneParams);
  }

  warn(message: string) {
    this.toast.error(message, { duration: 3000 })
  }

  // Check whether new form field element can be placed under the parent element
  canPlaceFormField(newElement: Entity, parentElement: Entity): boolean {
    const parentType = parentElement?.type;
    const childType = newElement.type;

    if (!parentElement) {   // This means that newElment will be placed under the root element
      if (childType === 'tab' || childType == 'step') {
        this.warn('Tab or Step wrapper are only allowed under the Tabs or Stepper wrapper');
        return false;
      } else if (childType === 'filter-bar' || childType === 'filter-content') {
        this.warn('Filter-bar and Filter-content are only allowed under the Filter-container wrapper');
        return false;
      } else if (childType === 'table-column') {
        this.warn('Table-column is only allowed under the table wrapper');
        return false;
      } else if(childType == 'ag-grid-column') {
        this.warn('Ag-grid-column is only allowed under the Ag Grid wrapper');
        return false;
      } else if(childType === 'table-of-contents-section') {
        this.warn('Table-of-contents-section is only allowed under the Table of Contents wrapper');
        return false;
      } else if(childType === 'timeline-step') {
        this.warn('Timeline-step wrapper is only allowed under the Table of Contents wrapper');
        return false;
      } else {
        return true;
      }
    }

    // In order to avoid complicated things, allow stepper and tabs only under the root element
    // if(childType === 'stepper' || childType === 'tabs' || childType === 'filter-container') {
    //   console.log({ parentType, dd: parentType === 'overview-header' })
    //   if(parentType === 'overview-header') return true;

    //   this.warn('Stepper, Tabs and FilterContainer wrappers are allowed only under the root elements');
    //   return false;
    // }

    // If parent element is not wrapper but leaf element like input, number etc, then prevent placement
    if (!parentElement.IsWrapper) {
      this.warn('Cannot place under the basic field');
      return false;
    }

    if (parentElement.Slot) {
      this.warn('Cannot place under the slot wrapper');
      return false;
    }

    // Only allow tab wrapper under the tabs wrapper
    if(parentType === 'ag-grid-column') {
      this.warn('Ag-grid-column cannot contain any children');
      return false;
    }
    else if (parentType === 'tabs' && childType !== 'tab') {
      this.warn('Only tab wrapper is allowed under the tabs wrapper');
      return false;
    } else if (childType === 'tab' && parentType !== 'tabs') {
      this.warn('Tab wrapper is only allowed under the tabs wrapper');
      return false;
    }

    if (parentType === 'description-wrapper' && childType !== 'label') {
      this.warn('Only label is allowed under the description wrapper');
      return false;
    }

    //Only allow table-column wrapper under the table wrapper
    if (parentType === 'table' && childType !== 'table-column' && childType !== 'table' && childType !== 'table-row') {
      this.warn('Only table, table-column, tabl-row wrapper is allowed under the table wrapper');
      return false;
    }
    else if (parentType === 'ag-grid' && childType !== 'ag-grid-column') {
      this.warn('Only ag-grid-column is allowed under the ag-grid wrapper');
      return false;
    }
    else if (childType === 'table-column' && parentType !== 'table' && parentType !== 'table-row') {
      this.warn('Table-column wrapper is only allowed under the table wrapper, table-row wrapper');
      return false;
    }else if(childType === 'table-row' && parentType !== 'table'){
      this.warn('Talbe-row wrapper is only allowed under the table wrapper');
      return false;
    } else if(parentType === 'table-row' && childType !== 'table-column'){
      this.warn('Only table-column wrapper is only allowed under the tabel-row wrapper');
      return false;
    }

    // Only allow step wrapper under the stepper wrapper
    if (parentType === 'stepper' && childType !== 'step') {
      this.warn('Only step wrapper is allowed under the stepper wrapper');
      return false;
    } else if (childType === 'step' && parentType !== 'stepper') {
      this.warn('Step wrapper is only allowed under the stepper wrapper');
      return false;
    }

    // Only allow table-of-content-section wrapper under the table-of-contents wrapper
    if (parentType === 'table-of-contents' && childType !== 'table-of-contents-section') {
      this.warn('Only table-of-content-section wrapper is allowed under the table-of-contents wrapper');
      return false;
    } else if (childType === 'table-of-contents-section' && parentType !== 'table-of-contents') {
      this.warn('Table-of-content-section wrapper is only allowed under the table-of-contents wrapper');
      return false;
    }

    // Only allow timeline-step wrapper under the timeline-stepper wrapper
    if (parentType === 'timeline-stepper' && childType !== 'timeline-step') {
      this.warn('Only timeline-step wrapper is allowed under the timeline-stepper');
      return false;
    } else if (childType === 'timeline-step' && parentType !== 'timeline-stepper') {
      this.warn('Timeline-step wrapper is only allowed under the timeline-stepper wrapper');
      return false;
    }

    // Check whether the target wrapper is moving element itself or its child element
    if (newElement.IsWrapper) {
      if (newElement.uniqueId === parentElement.uniqueId) {
        this.warn('Moving into itself is not allowed');
        return false;

      } else if (parentElement.ID.startsWith(newElement.ID)) {
        this.warn('Moving into children is not allowed');
        return false;
      }
    }
    return true;
  }

  fieldSelected(rowNode: RowNode) {
    this.prevFocusedEntity = this.entity;
    this.currentNode = rowNode;
    this.entity = rowNode.data;
    if (this.prevFocusedEntity) this.prevFocusedEntity.Selected = false;
    this.entity.Selected = true;
    this.gridApi.applyTransaction('update', [this.entity, this.prevFocusedEntity])
    const _schema = this.getFormConfig();
    this.schema = JSON.stringify(_schema);

    this.refreshForm();

    this.entity.Selected = false;
    this.gridApi.applyTransaction('update', [this.entity])
  }

  getNodeForEntity(entity: Entity) {
    let _node = null;
    this.gridApi.forEachNode(node => {
      console.log(node.data.uniqueId, entity.uniqueId, node.data.uniqueId === entity.uniqueId)
      if (node.data.uniqueId === entity.uniqueId) _node = node
    })

    return _node;
  }

  getFormConfig() {
    const topLevelFields = []
    this.gridApi.forEachNode(node => {
      if (node.level === 0) {
        if (node.data.IsWrapper) {
          node.data.clearChildren();
        }
        topLevelFields.push(node.data.Template)
      } else {
        if (node.data.IsWrapper) {
          node.data.clearChildren();
        }
        node.parent.data.addChildren(node.data.Template)
      }
    })
    return topLevelFields;
  }

  saveAsTemplate(ref) {
    const getComponentConfig = () => {
      return JSON.stringify([this.currentNode.data.Template]);
    }


    if (this.templateSaveForm.valid && this.currentNode) {
      const name = this.templateSaveFormModel['name'];
      console.log('saveAstemplate, name = ', name)
      const componentConfig = getComponentConfig();
      this.store.createTemplateEffect({ name, config: componentConfig, ref, type: 'Template' });
    }
  }

  fieldChanged(entity: Entity) {
    entity.Selected = true;
    this.gridApi.applyTransaction('update', [entity])
    const _schema = this.getFormConfig();
    this.schema = JSON.stringify(_schema);
    this.refreshForm();

    this.entity.Selected = false;
    this.gridApi.applyTransaction('update', [entity])
  }
}
