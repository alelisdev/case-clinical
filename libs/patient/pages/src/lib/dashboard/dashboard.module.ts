/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { SharedModule } from 'libs/shared/shared.module'
import { DashboardComponent } from './dashboard.component'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
  providers:[
    WebClinicalProviderFeatureStore
  ]
})
export class DashboardModule {}
