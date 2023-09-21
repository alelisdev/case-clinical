
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
import { WebPatientDetailComponent } from './web-patient-detail.component'
import { WebPatientOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer'


@NgModule({
  declarations: [
    WebPatientDetailComponent,

    WebPatientOverviewComponent
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
           component: WebPatientDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebPatientOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-patient-edit/web-patient-edit.module').then((m) => m.WebPatientEditModule),
            },
          {
                  path: 'appointments',
                  loadChildren: () => import('@case-clinical/web/appointment/feature').then((m) => m.WebAppointmentFeatureModule),
                },
          {
                  path: 'claims',
                  loadChildren: () => import('@case-clinical/web/claim/feature').then((m) => m.WebClaimFeatureModule),
                },
          {
                  path: 'documents',
                  loadChildren: () => import('@case-clinical/web/document/feature').then((m) => m.WebDocumentFeatureModule),
                },
          {
                  path: 'legal-cases',
                  loadChildren: () => import('@case-clinical/web/legal-case/feature').then((m) => m.WebLegalCaseFeatureModule),
                },
          {
                  path: 'patient-studies',
                  loadChildren: () => import('@case-clinical/web/patient-study/feature').then((m) => m.WebPatientStudyFeatureModule),
                },
          {
                  path: 'prescriptions',
                  loadChildren: () => import('@case-clinical/web/prescription/feature').then((m) => m.WebPrescriptionFeatureModule),
                },
          {
                  path: 'prior-authorization-requests',
                  loadChildren: () => import('@case-clinical/web/prior-authorization-request/feature').then((m) => m.WebPriorAuthorizationRequestFeatureModule),
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
    DocumentViewerModule,
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class WebPatientDetailModule {}
