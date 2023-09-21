import { WebUiNavsModule } from './../../../../../navs/src/lib/web-ui-navs.module';
import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormNavsComponent } from './ui-form-navs.component';

@NgModule({
  declarations: [UiFormNavsComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebUiCodeModule,
    WebUiNavsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'navs',
          component: UiFormNavsComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormNavsModule {}
