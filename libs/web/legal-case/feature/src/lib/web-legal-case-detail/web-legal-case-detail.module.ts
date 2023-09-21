import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTreeModule } from '@angular/material/tree'
import { FuseHighlightModule } from '@fuse/components/highlight'
import { FuseAlertModule } from '@fuse/components/alert'
import { FuseNavigationModule } from '@fuse/components/navigation'
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset'
import { SharedModule } from 'libs/shared/shared.module'
import { WebLegalCaseDetailComponent } from './web-legal-case-detail.component'
import { WebLegalCaseOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebLegalCaseNegotiationsComponent } from './negotiations/negotiations.component'
import { WebLegalCaseDetailResolver } from './web-legal-case-detail.resolver'

@NgModule({
  declarations: [WebLegalCaseDetailComponent, WebLegalCaseNegotiationsComponent, WebLegalCaseOverviewComponent],
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
      {
        path: '',
        component: WebLegalCaseDetailComponent,
        resolve: {
          legalCaseName: WebLegalCaseDetailResolver,
        },
        children: [
          {
            path: 'overview',
            pathMatch: 'full',
            component: WebLegalCaseOverviewComponent,
          },
          {
            path: 'edit',
            loadChildren: () =>
              import('../web-legal-case-edit/web-legal-case-edit.module').then((m) => m.WebLegalCaseEditModule),
          },
          {
            path: 'appointments',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/appointment/feature').then((m) => m.WebAppointmentFeatureModule),
          },
          {
            path: 'case-accounts',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/case-account/feature').then((m) => m.WebCaseAccountFeatureModule),
          },
          {
            path: 'case-pre-accidents',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/case-pre-accident/feature').then((m) => m.WebCasePreAccidentFeatureModule),
          },
          {
            path: 'case-pre-injuries',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/case-pre-injury/feature').then((m) => m.WebCasePreInjuryFeatureModule),
          },
          {
            path: 'case-pre-problems',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/case-pre-problem/feature').then((m) => m.WebCasePreProblemFeatureModule),
          },
          {
            path: 'case-pre-procedures',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/case-pre-procedure/feature').then((m) => m.WebCasePreProcedureFeatureModule),
          },
          {
            path: 'case-procedures',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/case-procedure/feature').then((m) => m.WebCaseProcedureFeatureModule),
          },
          {
            path: 'invoices',
            data: {
              title: 'Detail',
            },
            loadChildren: () => import('@case-clinical/web/invoice/feature').then((m) => m.WebInvoiceFeatureModule),
          },
          {
            path: 'insurances',
            data: {
              title: 'Detail',
            },
            loadChildren: () => import('@case-clinical/web/insurance/feature').then((m) => m.WebInsuranceFeatureModule),
          },
          {
            path: 'prior-meds-to-dates',
            data: {
              title: 'Detail',
            },
            loadChildren: () =>
              import('@case-clinical/web/prior-meds-to-date/feature').then((m) => m.WebPriorMedsToDateFeatureModule),
          },
          {
            path: 'negotiations',
            data: {
              title: 'Negotiations',
            },
            component: WebLegalCaseNegotiationsComponent,
          },
          {
            path: 'mailbox',
            data: {
              title: 'Mailbox',
            },
            loadChildren: () => import('@case-clinical/web/mailbox/feature').then((m) => m.MailboxModule),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'overview',
          },
        ],
      },
    ]),
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class WebLegalCaseDetailModule {}
