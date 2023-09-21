

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLanguageFeatureStore } from '@case-clinical/web/language/shared'
import { WebLanguageSelectComponent } from './web-language-select.component'
import { WebLanguageSelectTableViewComponent } from './web-language-select-table-view.component'
import { WebFormsUiLanguageComponent } from './web-language-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLanguageGridComponent } from './web-language-grid.component'

@NgModule({
  exports: [
        WebFormsUiLanguageComponent, 
        WebLanguageSelectTableViewComponent, 
        WebLanguageSelectComponent,
        WebLanguageGridComponent
    ],
  declarations: [
        WebFormsUiLanguageComponent, 
        WebLanguageSelectTableViewComponent, 
        WebLanguageSelectComponent,
        WebLanguageGridComponent
    ],
  imports: [
    CommonModule,
    FormlySelectModule,
    ReactiveFormsModule,
    WebCoreFeatureModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiGridModule,
    WebUiSelectFormModule,
    WebUiFormlyDesignerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'language-select',
          component: WebLanguageSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'language-grid',
          component: WebLanguageGridComponent,
        }
      ],
    }),
  ],
  providers: [WebLanguageFeatureStore],
})
export class WebFormsUiLanguageSelectModule {}
