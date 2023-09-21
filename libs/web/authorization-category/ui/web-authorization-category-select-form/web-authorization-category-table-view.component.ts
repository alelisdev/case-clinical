


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AuthorizationCategory } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-authorization-category-table-view',
  templateUrl: './web-authorization-category-table-view.component.html'
 })
export class WebAuthorizationCategoryTableViewComponent
    {
  @Input() authorizationCategories: AuthorizationCategory[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAuthorizationCategory($event) {
      if($event) {
        this.authorizationCategories.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      authorizationCategory,
    }: { authorizationCategory?: AuthorizationCategory },
  ) {
    this.dialog.open(tpl, { data: { authorizationCategory }, closeButton: false })
  }

}
