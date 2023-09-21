import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  template: `
    <iframe width="300" height="500" id="rc-widget" allow="autoplay; microphone" src="https://ringcentral.github.io/ringcentral-embeddable/app.html">
</iframe>
  `,
})
export class UiFormRingCentralComponent extends FieldType {

}
