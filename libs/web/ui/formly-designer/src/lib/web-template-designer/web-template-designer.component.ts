import { FormService } from './../../../../form/src/lib/form.service';
import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { WebUiFormField } from '@case-clinical/web/ui/form';
import { WebTemplateDesignerStore } from './web-template-designer.store';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  providers: [ WebTemplateDesignerStore ],
  selector: 'ui-web-template-designer',
  template: `
    <div class="w-full h-full flex flex-col bg-card p-4">
      <div *ngIf="readonly" class="text-2xl text-gray-800 dark:text-white font-bold py-2">Select {{type}} to import</div>
      <div class="flex gap-2 mt-2 mb-2">
        <ui-button *ngIf="!readonly" type="button" [variant]="'white'" label="Add New {{type}}" (click)="openAddDialog()">
        </ui-button>
        <ng-container *ngIf="readonly">
          <ui-button *ngIf="item$ | async as vm" type="button" [variant]="'white'" label="Import {{type}}" (click)="didFormLayoutSelect(vm)">
          </ui-button>
        </ng-container>
        <ui-button type="button" [variant]="'white'" label="Close" (click)="close.emit();">
        </ui-button>
      </div>
      <div class='flex flex-row h-full'>
        <ui-web-template-selector *ngIf="vm$ | async as vm" (save)="selected($event)" [readonly]="readonly" (editCallback)="onEdit($event)" (deleteCallback)="onDelete($event)" [rowData]="vm.templates" class="w-64"></ui-web-template-selector>
        <div class="w-full flex-1 flex flex-col p-1">
          <div class="flex-1 w-full border-l-2 border-b-2 border-r-2 border-t-8 rounded-t shadow-md border-gray-800 dark:border-gray-100 m-auto">
            <iframe id="templateViewiFrame" *ngIf="!hidePreview && safeUrl" target="_parent" width="100%" height="100%" frameBorder="0" [src]="safeUrl"></iframe>
          </div>
        </div>
      </div>

      </div>
      <ng-template #addDlg let-ref>
        <div class='bg-card p-6 h-full flex flex-col gap-4'>
          <div class="w-full h-full">
            <div class="text-xl text-gray-800 dark:text-gray-50 mb-2">Create New {{type}}</div>
            <div class="text-secondary">New {{type}} will be shared throughout the website!</div>
          </div>
          <form [formGroup]="formService.form" class="h-full rounded-sm overflow-hidden" novalidate (ngSubmit)="submit(formModel, ref)">
            <div>
              <formly-form [fields]="fields" [form]="formService.form" [model]="formModel"></formly-form>
            </div>
            <ui-button [disabled]="!formService.form.valid" class="px-1 py-1" [label]="'Save'" type="submit" ></ui-button>
            <ui-button [label]="'Cancel'" type="button" class="ml-2 py-1" (click)="ref.close()"></ui-button>
          </form>
        </div>
      </ng-template>
      <ng-template #designer>
        <ui-formly-designer
         *ngIf="item$ | async as item"
          class="w-full h-full"
          [type]="type"
          [schema]="item.config"
          [customLayouts]="parse(item.customLayouts)"
          [testData]="item.testData ?? '{}'"
          [modelData]="item.modelData ?? '{}'"
          (schemaDidChange)="schemaDidChange($event)"
        ></ui-formly-designer>
      </ng-template>
  `,
})
export class WebTemplateDesignerComponent implements OnInit {
  @Input() type: 'Template'|'Component'|'Wrapper' = 'Template';
  @Input() readonly = false;
  @Output() templateDidSelect = new EventEmitter()
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter()

  @ViewChild("designer") designerTpl: TemplateRef<any>;
  @ViewChild("addDlg") addDlg: TemplateRef<any>;

  safeUrl: SafeResourceUrl

  componentId: string

  hidePreview = false;
  formModel = {}
  fields = []

  vm$ = this.store.vm$;
  item$ = this.store.item$;

  iFrameId = 'templateViewiFrame'

  constructor(
    public readonly dialog: DialogService,
    public formService: FormService,
    private store: WebTemplateDesignerStore,
    public sanitizer: DomSanitizer,
    private confirmService: FuseConfirmationService,
  ) {
    this.iFrameId = `${this.iFrameId}_${Math.round(Math.random() * 100000)}`
  }

  ngOnInit() {
    this.store.loadTemplatesEffect(this.type);

    const url = `${window.location.origin}/preview/template_form_config`
    this.safeUrl= this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.fields = [
      WebUiFormField.input('componentName', { label: `${this.type} Name`, required: true }, { className: 'w-full my-2 px-1' })
    ]
  }

  postDataToIFrame(data: any = {}) {
    const iframe = document.getElementById('templateViewiFrame');
    if (iframe == null) return;
    const iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    iWindow.postMessage({ previewData: true, data }, window.origin);
  }

  didFormLayoutSelect({ name, config, customLayouts }) {
    this.templateDidSelect.emit({ name, config, type: this.type, customLayouts: JSON.parse(customLayouts) })
  }

  parse(str: string) {
    return JSON.parse(str);
  }

  openAddDialog() {
    this.dialog.open(this.addDlg, { minHeight: '200px' })
  }

  selected(data) {
    this.store.removeItem();
    this.store.loadTemplateDetailEffect({ name: data.id, type: this.type, postData: this.postDataToIFrame.bind(this) });
  }

  onEdit(data) {
    if(data) {
      this.componentId = data.id;
      this.store.loadTemplateDetailEffect({ name: data.id, type: this.type });
      this.dialog.open(this.designerTpl, {
        width: '100%',
        height: '100%',
        closeButton: false,
        enableClose:false
      })
      this.hidePreview = true;
    } else {
      this.componentId = null;
    }
  }

  onDelete(data) {
    if(confirm("Are you sure you want to delete?")){
      this.store.deleteTemplateEffect({ type: this.type, name: data.name})
    }
  }

  submit(data, ref) {
    this.store.createTemplateEffect({ type: this.type, name: data.componentName, config: "", ref });
  }

  schemaDidChange({schema, testData, modelData }) {
    this.store.updateTemplateEffect({ type: this.type, formName: this.componentId, config: JSON.stringify(schema), previewImage: "", testData, modelData });
  }
}
