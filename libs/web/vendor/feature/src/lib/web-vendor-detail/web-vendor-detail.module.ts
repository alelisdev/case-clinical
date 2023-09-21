
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
import { WebVendorDetailComponent } from './web-vendor-detail.component'
import { WebVendorOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebVendorDetailComponent,

    WebVendorOverviewComponent
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
           component: WebVendorDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebVendorOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-vendor-edit/web-vendor-edit.module').then((m) => m.WebVendorEditModule),
            },
          {
                  path: 'assigned-documents',
                  loadChildren: () => import('@case-clinical/web/assigned-document/feature').then((m) => m.WebAssignedDocumentFeatureModule),
                },
          {
                  path: 'case-accounts',
                  loadChildren: () => import('@case-clinical/web/case-account/feature').then((m) => m.WebCaseAccountFeatureModule),
                },
          {
                  path: 'clinical-providers',
                  loadChildren: () => import('@case-clinical/web/clinical-provider/feature').then((m) => m.WebClinicalProviderFeatureModule),
                },
          {
                  path: 'contracts',
                  loadChildren: () => import('@case-clinical/web/contract/feature').then((m) => m.WebContractFeatureModule),
                },
          {
                  path: 'durable-medical-equipments',
                  loadChildren: () => import('@case-clinical/web/durable-medical-equipment/feature').then((m) => m.WebDurableMedicalEquipmentFeatureModule),
                },
          {
                  path: 'procedure-vendors',
                  loadChildren: () => import('@case-clinical/web/procedure-vendor/feature').then((m) => m.WebProcedureVendorFeatureModule),
                },
          {
                  path: 'vendor-locations',
                  loadChildren: () => import('@case-clinical/web/vendor-location/feature').then((m) => m.WebVendorLocationFeatureModule),
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
export class WebVendorDetailModule {}
