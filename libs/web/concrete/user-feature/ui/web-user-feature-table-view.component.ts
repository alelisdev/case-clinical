


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserFeature } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-user-feature-table-view',
  templateUrl: './web-user-feature-table-view.component.html'
 })
export class WebUserFeatureTableViewComponent
    {
  @Input() userFeatures: UserFeature[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createUserFeature($event) {
      if($event) {
        this.userFeatures.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      userFeature,
    }: { userFeature?: UserFeature },
  ) {
    this.dialog.open(tpl, { data: { userFeature }, closeButton: false })
  }

}
