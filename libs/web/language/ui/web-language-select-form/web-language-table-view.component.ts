


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Language } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-language-table-view',
  templateUrl: './web-language-table-view.component.html'
 })
export class WebLanguageTableViewComponent
    {
  @Input() languages: Language[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLanguage($event) {
      if($event) {
        this.languages.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      language,
    }: { language?: Language },
  ) {
    this.dialog.open(tpl, { data: { language }, closeButton: false })
  }

}
