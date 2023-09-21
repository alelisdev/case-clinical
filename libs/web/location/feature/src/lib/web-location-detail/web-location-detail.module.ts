
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
import { WebLocationDetailComponent } from './web-location-detail.component'
import { WebLocationOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebLocationDetailComponent,

    WebLocationOverviewComponent
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
           component: WebLocationDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebLocationOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-location-edit/web-location-edit.module').then((m) => m.WebLocationEditModule),
            },
          {
                  path: 'appointments',
                  loadChildren: () => import('@case-clinical/web/appointment/feature').then((m) => m.WebAppointmentFeatureModule),
                },
          {
                  path: 'case-accounts',
                  loadChildren: () => import('@case-clinical/web/case-account/feature').then((m) => m.WebCaseAccountFeatureModule),
                },
          {
                  path: 'case-procedures',
                  loadChildren: () => import('@case-clinical/web/case-procedure/feature').then((m) => m.WebCaseProcedureFeatureModule),
                },
          {
                  path: 'clinical-provider-locations',
                  loadChildren: () => import('@case-clinical/web/clinical-provider-location/feature').then((m) => m.WebClinicalProviderLocationFeatureModule),
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
export class WebLocationDetailModule {}
