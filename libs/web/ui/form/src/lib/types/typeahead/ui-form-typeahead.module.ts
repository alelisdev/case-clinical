import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer';
import { MatIconModule } from '@angular/material/icon';
import { WebUiSearchModule } from './../../../../../search/src/lib/web-ui-search.module';
import { MatButtonModule } from '@angular/material/button';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormTypeaheadComponent } from './ui-form-typeahead.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { AgGridModule } from '@ag-grid-community/angular';

@NgModule({
  declarations: [UiFormTypeaheadComponent],
  imports: [
    AgGridModule.withComponents({}),
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    WebUiButtonModule,
    WebUiSearchModule,
    NgSelectModule,
    WebUiButtonModule,
    MatButtonModule,
    WebUiFormlyDesignerModule,
    MatIconModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'typeahead',
          component: UiFormTypeaheadComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormTypeaheadModule {}
