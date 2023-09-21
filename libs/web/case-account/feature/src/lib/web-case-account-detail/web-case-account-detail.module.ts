
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
import { WebCaseAccountDetailComponent } from './web-case-account-detail.component'
import { WebCaseAccountOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebCaseAccountDetailComponent,

    WebCaseAccountOverviewComponent
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
           component: WebCaseAccountDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebCaseAccountOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-case-account-edit/web-case-account-edit.module').then((m) => m.WebCaseAccountEditModule),
            },
          {
                  path: 'case-account-payments',
                  loadChildren: () => import('@case-clinical/web/case-account-payment/feature').then((m) => m.WebCaseAccountPaymentFeatureModule),
                },
          {
                  path: 'journal-entries',
                  loadChildren: () => import('@case-clinical/web/journal-entry/feature').then((m) => m.WebJournalEntryFeatureModule),
                },
          {
                  path: 'write-offs',
                  loadChildren: () => import('@case-clinical/web/write-off/feature').then((m) => m.WebWriteOffFeatureModule),
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
export class WebCaseAccountDetailModule {}
