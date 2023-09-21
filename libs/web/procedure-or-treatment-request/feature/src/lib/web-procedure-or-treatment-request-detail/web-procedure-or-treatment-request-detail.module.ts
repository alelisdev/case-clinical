
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
import { WebProcedureOrTreatmentRequestDetailComponent } from './web-procedure-or-treatment-request-detail.component'
import { WebProcedureOrTreatmentRequestOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebProcedureOrTreatmentRequestDetailComponent,

    WebProcedureOrTreatmentRequestOverviewComponent
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
           component: WebProcedureOrTreatmentRequestDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebProcedureOrTreatmentRequestOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-procedure-or-treatment-request-edit/web-procedure-or-treatment-request-edit.module').then((m) => m.WebProcedureOrTreatmentRequestEditModule),
            },
          {
                  path: 'procedure-or-treatment-request-authorizations',
                  loadChildren: () => import('@case-clinical/web/procedure-or-treatment-request-authorization/feature').then((m) => m.WebProcedureOrTreatmentRequestAuthorizationFeatureModule),
                },
          {
                  path: 'procedure-or-treatment-request-diagnosis-codes',
                  loadChildren: () => import('@case-clinical/web/procedure-or-treatment-request-diagnosis-code/feature').then((m) => m.WebProcedureOrTreatmentRequestDiagnosisCodeFeatureModule),
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
export class WebProcedureOrTreatmentRequestDetailModule {}
