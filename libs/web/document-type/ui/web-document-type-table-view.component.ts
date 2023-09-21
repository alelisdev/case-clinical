


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DocumentType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-document-type-table-view',
  templateUrl: './web-document-type-table-view.component.html'
 })
export class WebDocumentTypeTableViewComponent
    {
  @Input() documentTypes: DocumentType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createDocumentType($event) {
      if($event) {
        this.documentTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      documentType,
    }: { documentType?: DocumentType },
  ) {
    this.dialog.open(tpl, { data: { documentType }, closeButton: false })
  }

}
