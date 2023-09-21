import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiPaginationComponent } from './web-ui-pagination.component'
import { WebUiLaIconModule } from '../../../../../la-icon/src/lib/web-ui-la-icon.module';

import { FormlyModule } from '@ngx-formly/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
    RouterModule,
    WebUiIconModule,
    WebUiLaIconModule,
    CommonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'pagination',
          component: WebUiPaginationComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
    ],
  declarations:[
    WebUiPaginationComponent
  ]
})
export class WebUiPaginationModule {}
