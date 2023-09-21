import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-radial-gauge',
  templateUrl: `./web-ui-radial-gauge.component.html`
})

export class WebUiHorizontalGaugeComponent {

  @Input() totalNumber = 1000000
  @Input() firstExpense = 650000
  @Input() secondExpense = 425000

  constructor() { console.log("") }

  formatCurrencyString(aNumber: number) {
    return aNumber.toLocaleString()
  }
}
