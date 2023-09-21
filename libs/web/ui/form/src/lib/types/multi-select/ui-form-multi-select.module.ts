import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { UiFormSelectSearchComponent } from './ui-form-multi-select.component'
import { WebUiMultiSelectModule } from '@case-clinical/web/ui/multi-select';
import { NgSelectModule } from '@ng-select/ng-select'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormlySelectModule } from '@ngx-formly/core/select'
@NgModule({
  declarations: [UiFormSelectSearchComponent],
  exports: [UiFormSelectSearchComponent],
  imports: [
    WebUiMultiSelectModule,
    NgSelectModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'multi-select',
          component: UiFormSelectSearchComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ],
})
export class UiFormSelectSearchModule {}
