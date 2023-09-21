
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
import { WebPriorAuthorizationRequestDetailComponent } from './web-prior-authorization-request-detail.component'
import { WebPriorAuthorizationRequestOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebPriorAuthorizationRequestDetailComponent,

    WebPriorAuthorizationRequestOverviewComponent
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
           component: WebPriorAuthorizationRequestDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebPriorAuthorizationRequestOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-prior-authorization-request-edit/web-prior-authorization-request-edit.module').then((m) => m.WebPriorAuthorizationRequestEditModule),
            },
          {
                  path: 'claims',
                  loadChildren: () => import('@case-clinical/web/claim/feature').then((m) => m.WebClaimFeatureModule),
                },
          {
                  path: 'prior-auth-dmes',
                  loadChildren: () => import('@case-clinical/web/prior-auth-dme/feature').then((m) => m.WebPriorAuthDmeFeatureModule),
                },
          {
                  path: 'prior-auth-guidelines',
                  loadChildren: () => import('@case-clinical/web/prior-auth-guideline/feature').then((m) => m.WebPriorAuthGuidelineFeatureModule),
                },
          {
                  path: 'prior-authorization-diagnosis-codes',
                  loadChildren: () => import('@case-clinical/web/prior-authorization-diagnosis-code/feature').then((m) => m.WebPriorAuthorizationDiagnosisCodeFeatureModule),
                },
          {
                  path: 'prior-authorization-equipments',
                  loadChildren: () => import('@case-clinical/web/prior-authorization-equipment/feature').then((m) => m.WebPriorAuthorizationEquipmentFeatureModule),
                },
          {
                  path: 'prior-authorization-implants',
                  loadChildren: () => import('@case-clinical/web/prior-authorization-implant/feature').then((m) => m.WebPriorAuthorizationImplantFeatureModule),
                },
          {
                  path: 'prior-authorization-procedure-codes',
                  loadChildren: () => import('@case-clinical/web/prior-authorization-procedure-code/feature').then((m) => m.WebPriorAuthorizationProcedureCodeFeatureModule),
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
export class WebPriorAuthorizationRequestDetailModule {}
