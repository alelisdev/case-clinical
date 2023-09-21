
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
import { WebOrganizationDetailComponent } from './web-organization-detail.component'
import { WebOrganizationOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebOrganizationDetailComponent,

    WebOrganizationOverviewComponent
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
           component: WebOrganizationDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebOrganizationOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-organization-edit/web-organization-edit.module').then((m) => m.WebOrganizationEditModule),
            },
          {
                  path: 'contracts',
                  loadChildren: () => import('@case-clinical/web/contract/feature').then((m) => m.WebContractFeatureModule),
                },
                {
                  path: 'invoices',
                  loadChildren: () => import('@case-clinical/web/invoice/feature').then((m) => m.WebInvoiceFeatureModule),
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
export class WebOrganizationDetailModule {}
