
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
import { WebLeadDetailComponent } from './web-lead-detail.component'
import { WebLeadOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebLeadDetailComponent,

    WebLeadOverviewComponent
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
           component: WebLeadDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebLeadOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-lead-edit/web-lead-edit.module').then((m) => m.WebLeadEditModule),
            },
          {
                  path: 'body-part-leads',
                  loadChildren: () => import('@case-clinical/web/body-part-lead/feature').then((m) => m.WebBodyPartLeadFeatureModule),
                },
          {
                  path: 'insurances',
                  loadChildren: () => import('@case-clinical/web/insurance/feature').then((m) => m.WebInsuranceFeatureModule),
                },
          {
                  path: 'lead-actions',
                  loadChildren: () => import('@case-clinical/web/lead-action/feature').then((m) => m.WebLeadActionFeatureModule),
                },
          {
                  path: 'lead-injuries',
                  loadChildren: () => import('@case-clinical/web/lead-injury/feature').then((m) => m.WebLeadInjuryFeatureModule),
                },
          {
                  path: 'lead-treatments',
                  loadChildren: () => import('@case-clinical/web/lead-treatment/feature').then((m) => m.WebLeadTreatmentFeatureModule),
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
export class WebLeadDetailModule {}
