import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChildFormSelectComponent } from './child-form-select.component'
import { UiFormConextProviderModule } from '@case-clinical/web/ui/form'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'

@NgModule({
  imports: [
    CommonModule,
    UiFormConextProviderModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
  ],
  declarations: [ ChildFormSelectComponent ],
  exports: [ ChildFormSelectComponent ]

})
export class WebUiFormlyFormSwitchModule {}
