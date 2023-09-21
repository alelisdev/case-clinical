import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormToolTipComponent } from './ui-form-tooltip.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { NgxMaterialPopoverModule } from 'ngx-material-popover'

@NgModule({
  declarations: [UiFormToolTipComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    NgxMaterialPopoverModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'tooltip',
          component: UiFormToolTipComponent,
        },
      ],
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UiFormToolTipModule {}
