


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Review } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-review-table-view',
  templateUrl: './web-review-table-view.component.html'
 })
export class WebReviewTableViewComponent
    {
  @Input() reviews: Review[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createReview($event) {
      if($event) {
        this.reviews.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      review,
    }: { review?: Review },
  ) {
    this.dialog.open(tpl, { data: { review }, closeButton: false })
  }

}
