import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormSplitComponent } from './ui-form-split.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'
import { AngularSplitModule } from 'angular-split';
@NgModule({
  declarations: [UiFormSplitComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UiFormConextProviderModule,
    AngularSplitModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'split',
          component: UiFormSplitComponent,
        },
      ],
    }),
  ],
})
export class UiFormSplitModule {}
