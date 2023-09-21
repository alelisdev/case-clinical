

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebFavoriteProviderFeatureStore } from '@case-clinical/web/favorite-provider/shared'
import { WebFavoriteProviderSelectComponent } from './web-favorite-provider-select.component'
import { WebFavoriteProviderSelectTableViewComponent } from './web-favorite-provider-select-table-view.component'
import { WebFormsUiFavoriteProviderComponent } from './web-favorite-provider-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebFavoriteProviderGridComponent } from './web-favorite-provider-grid.component'

@NgModule({
  exports: [
        WebFormsUiFavoriteProviderComponent, 
        WebFavoriteProviderSelectTableViewComponent, 
        WebFavoriteProviderSelectComponent,
        WebFavoriteProviderGridComponent
    ],
  declarations: [
        WebFormsUiFavoriteProviderComponent, 
        WebFavoriteProviderSelectTableViewComponent, 
        WebFavoriteProviderSelectComponent,
        WebFavoriteProviderGridComponent
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
          name: 'favorite-provider-select',
          component: WebFavoriteProviderSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'favorite-provider-grid',
          component: WebFavoriteProviderGridComponent,
        }
      ],
    }),
  ],
  providers: [WebFavoriteProviderFeatureStore],
})
export class WebFormsUiFavoriteProviderSelectModule {}
