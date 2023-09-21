import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { NgModule } from '@angular/core'
import { ScrollSpyDirective } from './scroll-spy.directive'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormTablefContentsComponent } from './ui-form-table-of-contents.component'
import { UiFormTableOfContentSectionComponent } from './ui-form-table-of-content-section.component'

@NgModule({
  declarations: [
    UiFormTablefContentsComponent,
    UiFormTableOfContentSectionComponent,
    ScrollSpyDirective,
  ],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'table-of-contents',
          component: UiFormTablefContentsComponent,
        },
        {
          name: 'table-of-contents-section',
          component: UiFormTableOfContentSectionComponent,
        },
      ],
    }),
  ],
})
export class UiFormTableOfContentsModule {}
