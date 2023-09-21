


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Portfolio } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-portfolio-table-view',
  templateUrl: './web-portfolio-table-view.component.html'
 })
export class WebPortfolioTableViewComponent
    {
  @Input() portfolios: Portfolio[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPortfolio($event) {
      if($event) {
        this.portfolios.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      portfolio,
    }: { portfolio?: Portfolio },
  ) {
    this.dialog.open(tpl, { data: { portfolio }, closeButton: false })
  }

}
