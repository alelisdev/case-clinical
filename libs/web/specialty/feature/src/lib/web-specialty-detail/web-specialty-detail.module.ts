
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'libs/shared/shared.module';
import { WebSpecialtyDetailComponent } from './web-specialty-detail.component'
import { WebSpecialtyOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebSpecialtyDetailComponent,

    WebSpecialtyOverviewComponent
],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    FuseHighlightModule,
    FuseAlertModule,
    FuseNavigationModule,
    FuseScrollResetModule,
    SharedModule,
    CommonModule,
    WebUiPanelModule,
    WebUiDescriptionListModule,
    WebUiCardHeaderModule,
    WebUiPageModule,
    UtilitySharedModule,
    UiFormsSharedModule,
    WebCoreFeatureModule,
    WebUiFormlyDesignerModule,
    RouterModule.forChild([
        { path: '', 
           component: WebSpecialtyDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebSpecialtyOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-specialty-edit/web-specialty-edit.module').then((m) => m.WebSpecialtyEditModule),
            },
          {
                  path: 'clinical-provider-specialties',
                  loadChildren: () => import('@case-clinical/web/clinical-provider-specialty/feature').then((m) => m.WebClinicalProviderSpecialtyFeatureModule),
                },
          {
                  path: 'facility-fee-schedules',
                  loadChildren: () => import('@case-clinical/web/facility-fee-schedule/feature').then((m) => m.WebFacilityFeeScheduleFeatureModule),
                },
          {
                  path: 'fee-schedules',
                  loadChildren: () => import('@case-clinical/web/fee-schedule/feature').then((m) => m.WebFeeScheduleFeatureModule),
                },
            {
            path:'',
            pathMatch: 'full',
            redirectTo: 'overview'
          }
        ]
        }]),
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class WebSpecialtyDetailModule {}