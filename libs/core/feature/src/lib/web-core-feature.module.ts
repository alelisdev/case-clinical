import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { SvgIconsModule } from '@ngneat/svg-icon'
import { DialogModule } from '@ngneat/dialog'
import { WebUiToastModule } from '@case-clinical/web/ui/toast'
import { WebCoreFeatureGraphQLModule } from './web-core-feature-graphql.module'
import { GetTotalPipe } from './pipes/total.pipe'
import { AgGridModule } from '@ag-grid-community/angular'
import { CheckboxRenderer } from './cell-renderer/check-box.renderer'
import { FormlyJsonFormViewsStore } from '@case-clinical/web/ui/formly-designer'

export function getEnumAsArray(enumType) {
  return Object.keys(enumType).map((element) => {
    let name = element.replace('_', ' ').replace('_', ' ')
    return { id: element, name: name }
  })
}

@NgModule({
  declarations: [GetTotalPipe, CheckboxRenderer],
  providers: [GetTotalPipe, FormlyJsonFormViewsStore],
  imports: [
    HttpClientModule,
    WebCoreFeatureGraphQLModule,
    SvgIconsModule.forRoot(),
    DialogModule.forRoot(),
    AgGridModule.withComponents([CheckboxRenderer]),
    WebUiToastModule,
  ],
  exports: [GetTotalPipe, CheckboxRenderer],
})
export class WebCoreFeatureModule {}
