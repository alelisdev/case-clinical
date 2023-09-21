import { FilterGroupComponent } from './filter-group.component';
import { MatSelectModule } from '@angular/material/select';
import { WebUiFormlyDesignerModule } from './../../../../../formly-designer/src/lib/web-ui-formly-designer.module';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormFilterContainerComponent } from './ui-form-filter-container.component'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module';
import { SortGroupComponent } from './sort-group.component';


@NgModule({
  declarations: [
    UiFormFilterContainerComponent,
    FilterGroupComponent,
    SortGroupComponent,
  ],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    WebUiFormlyDesignerModule,
    MatSelectModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'filter-container',
          component: UiFormFilterContainerComponent,
        }
      ],
    }),
  ],
})
export class UiFormFilterContainerModule {}
