
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Patient } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-patient-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="patients"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebPatientSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() patients: Patient[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'ethnicity.name', headerName: 'Ethnicity', filter: 'agTextColumnFilter' },
{ field: 'gender.name', headerName: 'Gender', filter: 'agTextColumnFilter' },
{ field: 'language.name', headerName: 'Language', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'middleName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'suffix', filter: 'agTextColumnFilter'  },
{ field: 'genderId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'nickname', filter: 'agTextColumnFilter'  },
{ field: 'height', filter: 'agTextColumnFilter'  },
{ field: 'weight', filter: 'agTextColumnFilter'  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },
{ field: 'primaryPhoneNumber', filter: 'agTextColumnFilter'  },
{ headerName: 'Is Primary Phone Mobile', field: 'isPrimaryPhoneMobile', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'secondaryPhoneNumber', filter: 'agTextColumnFilter'  },
{ headerName: 'Is Secondary Phone Mobile', field: 'isSecondaryPhoneMobile', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'memberRegistrationNumber', filter: 'agTextColumnFilter'  },
{ field: 'ethnicityId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'languageId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Requires Translator', field: 'requiresTranslator', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'socialSecurityNumber', filter: 'agTextColumnFilter'  },
{ field: 'honorific', filter: 'agTextColumnFilter'  },
{ field: 'primaryEmailAddress', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine2', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressStateOrProvince', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'notes', filter: 'agTextColumnFilter'  },

{
      headerName: 'Latitude',
      field: 'latitude',
      valueFormatter: params => currencyFormatter(params.data?.latitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Longitude',
      field: 'longitude',
      valueFormatter: params => currencyFormatter(params.data?.longitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'emergencyContactId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'homePhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'mobileNumber', filter: 'agTextColumnFilter'  },
{ field: 'bmi', filter: 'agTextColumnFilter'  },
{ field: 'occupation', filter: 'agTextColumnFilter'  },
{ field: 'debtorRemarks', filter: 'agTextColumnFilter'  },
{ field: 'workAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'workAddressLine2', filter: 'agTextColumnFilter'  },
{ field: 'workAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'workAddressStateOrProvince', filter: 'agTextColumnFilter'  },
{ field: 'workAddressPostalCode', filter: 'agTextColumnFilter'  },
{
      headerName: 'Work Latitude',
      field: 'workLatitude',
      valueFormatter: params => currencyFormatter(params.data?.latitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Work Longitude',
      field: 'workLongitude',
      valueFormatter: params => currencyFormatter(params.data?.longitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}
  ]

  selectionDidChange(selectedRows) {
    this.rowItemsSelected.emit(selectedRows)
  }
  setSelected(ids: string[]) {
    this.tableView.gridApi.forEachNode((node) => {
      if (ids.includes(node.data?.id)) {
        node.setSelected(true)
      } else {
        node.setSelected(false)
      }
    })
  }
  onSelected(selected) {
    this.itemDidSelect.emit(selected)
  }
}

