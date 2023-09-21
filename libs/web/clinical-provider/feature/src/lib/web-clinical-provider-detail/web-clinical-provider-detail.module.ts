
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
import { WebClinicalProviderDetailComponent } from './web-clinical-provider-detail.component'
import { WebClinicalProviderOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebClinicalProviderDetailComponent,

    WebClinicalProviderOverviewComponent
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
           component: WebClinicalProviderDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebClinicalProviderOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-clinical-provider-edit/web-clinical-provider-edit.module').then((m) => m.WebClinicalProviderEditModule),
            },
          {
                  path: 'appointments',
                  loadChildren: () => import('@case-clinical/web/appointment/feature').then((m) => m.WebAppointmentFeatureModule),
                },
          {
                  path: 'clinical-provider-locations',
                  loadChildren: () => import('@case-clinical/web/clinical-provider-location/feature').then((m) => m.WebClinicalProviderLocationFeatureModule),
                },
          {
                  path: 'clinical-provider-specialties',
                  loadChildren: () => import('@case-clinical/web/clinical-provider-specialty/feature').then((m) => m.WebClinicalProviderSpecialtyFeatureModule),
                },
          {
                  path: 'clinical-provider-tags',
                  loadChildren: () => import('@case-clinical/web/clinical-provider-tag/feature').then((m) => m.WebClinicalProviderTagFeatureModule),
                },
          {
                  path: 'favorite-providers',
                  loadChildren: () => import('@case-clinical/web/favorite-provider/feature').then((m) => m.WebFavoriteProviderFeatureModule),
                },
          {
                  path: 'medical-condition-providers',
                  loadChildren: () => import('@case-clinical/web/medical-condition-provider/feature').then((m) => m.WebMedicalConditionProviderFeatureModule),
                },
          {
                  path: 'medical-records',
                  loadChildren: () => import('@case-clinical/web/medical-record/feature').then((m) => m.WebMedicalRecordFeatureModule),
                },
          {
                  path: 'pch-providers',
                  loadChildren: () => import('@case-clinical/web/pch-provider/feature').then((m) => m.WebPchProviderFeatureModule),
                },
          {
                  path: 'educations',
                  loadChildren: () => import('@case-clinical/web/education/feature').then((m) => m.WebEducationFeatureModule),
                },
          {
                  path: 'experiences',
                  loadChildren: () => import('@case-clinical/web/experience/feature').then((m) => m.WebExperienceFeatureModule),
                },
          {
                  path: 'awards',
                  loadChildren: () => import('@case-clinical/web/award/feature').then((m) => m.WebAwardFeatureModule),
                },
          {
                  path: 'users',
                  loadChildren: () => import('@case-clinical/web/user/feature').then((m) => m.WebUserFeatureModule),
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
export class WebClinicalProviderDetailModule {}
