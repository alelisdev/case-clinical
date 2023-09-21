import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormImageComponent } from './ui-form-image.component';

@NgModule({
  declarations: [UiFormImageComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'picture',
          component: UiFormImageComponent,
        },
      ],
    }),
  ],
})
export class UiFormImageModule {}
