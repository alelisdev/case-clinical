

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPortfolioFeatureStore } from '@case-clinical/web/portfolio/shared'
import { WebPortfolioSelectComponent } from './web-portfolio-select.component'
import { WebPortfolioSelectTableViewComponent } from './web-portfolio-select-table-view.component'
import { WebFormsUiPortfolioComponent } from './web-portfolio-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPortfolioGridComponent } from './web-portfolio-grid.component'

@NgModule({
  exports: [
        WebFormsUiPortfolioComponent, 
        WebPortfolioSelectTableViewComponent, 
        WebPortfolioSelectComponent,
        WebPortfolioGridComponent
    ],
  declarations: [
        WebFormsUiPortfolioComponent, 
        WebPortfolioSelectTableViewComponent, 
        WebPortfolioSelectComponent,
        WebPortfolioGridComponent
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
          name: 'portfolio-select',
          component: WebPortfolioSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'portfolio-grid',
          component: WebPortfolioGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPortfolioFeatureStore],
})
export class WebFormsUiPortfolioSelectModule {}
