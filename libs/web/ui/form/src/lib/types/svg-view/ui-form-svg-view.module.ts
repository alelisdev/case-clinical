import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormSvgViewComponent } from './ui-form-svg-view.component';

@NgModule({
  declarations: [UiFormSvgViewComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'svg-view',
          component: UiFormSvgViewComponent,
        },
      ],
    }),
  ],
})
export class UiFormSvgViewModule {}
