


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Document } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-document-table-view',
  templateUrl: './web-document-table-view.component.html'
 })
export class WebDocumentTableViewComponent
    {
  @Input() documents: Document[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createDocument($event) {
      if($event) {
        this.documents.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      document,
    }: { document?: Document },
  ) {
    this.dialog.open(tpl, { data: { document }, closeButton: false })
  }

}
