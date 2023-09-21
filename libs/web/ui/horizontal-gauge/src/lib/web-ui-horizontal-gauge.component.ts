import { Component, Input } from '@angular/core'

@Component({
    selector: 'ui-horizontal-gauge',
    templateUrl: `./web-ui-horizontal-gauge.component.html`
})
export class WebUiHorizontalGaugeComponent {
    @Input() policyLimit = 1000000
    @Input() totalExpenses = 650000
    @Input() medicalExpenses = 425000

    constructor() { console.log("") }

    formatCurrencyString(aNumber: number) {
        return aNumber.toLocaleString()
    }

}
