import { FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { ColDef } from '@ag-grid-community/core';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core'
import { RoleNavigation } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui';
import { SettingsRoleStore } from '../settings-role.store';
import { WebUiFormField } from '@case-clinical/web/ui/form';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-navigation-table-view',
  template: `
    <table-view
      *ngIf="vm$ | async as vm"
      class="w-full h-192"
      (itemDidSelect)="model=$event; openDialog(editTpl, { roleNavigation: $event })"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="vm.roleNavigations"
      [showSidebar]="true"
      [columnDefs]="columnDefs"
    ></table-view>

    <ng-template #editTpl let-ref>
      <div class="dark:bg-gray-800 overflow-hidden p-7 flex flex-col gap-5">
        <div class="font-bold text-lg px-2 text-white">Edit Role Navigation</div>
        <ui-form [form]="form" [fields]="fields" [model]="model" [options]="options" (submitForm)="submit($event)">
            <ui-button class="pl-2" [label]="'Save'" type="submit" ></ui-button>
            <ui-button class="pl-2" [label]="'Cancel'" (click)="ref.close()" ></ui-button>
        </ui-form>
      </div>
    </ng-template>
  `
})
export class WebNavigationTableViewComponent implements OnInit {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() navigations: RoleNavigation[] = []
  @Input() data: []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()

  vm$ = this.store.vm$;

  columnDefs: ColDef[] = [
    { field: 'id', filter: 'agTextColumnFilter' ,hide:true },
    { field: 'feature.name', headerName: 'Feature', sortable: false, filter: 'agTextColumnFilter'  },
    { field: 'title', sortable: false },
    { field: 'icon', sortable: false },
    { field: 'link', sortable: false },
  ]

  dialogRef = null;
  form = new FormGroup({})
  model: any = {
  }
  options = {
    formState: {
      mainModel: this.model
    }
  }
  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full' }),
      WebUiFormField.input('icon', { label: 'Icon', required: true }, { className: 'w-full' }),
      WebUiFormField.input('link', { label: 'Link', required: true }, { className: 'w-full' }),
    ])
  ]

  constructor(private store: SettingsRoleStore, private dialog: DialogService) {

  }

  ngOnInit(): void {
    this.store.loadRoleNavigationsEffect(null)
  }

  submit({id, title, link, icon }) {
    if(this.form.valid) {
      this.store.updateRoleNavigationEffect({ roleNavigationId: id, input: { title, link, icon }, dialogRef: this.dialogRef})
    }
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      roleNavigation,
    }: { roleNavigation?: RoleNavigation },
  ) {
    this.dialogRef = this.dialog.open(tpl, { data: { roleNavigation }, closeButton: false })
  }
}
