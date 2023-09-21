import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { UiFormSimpleTypeaheadComponent } from './ui-form-simple-typeahead.component';

@NgModule({
  declarations: [UiFormSimpleTypeaheadComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'simpleTypeahead',
          component: UiFormSimpleTypeaheadComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormSimpleTypeaheadModule {}
