
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
import { WebContactDetailComponent } from './web-contact-detail.component'
import { WebContactOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebContactDetailComponent,

    WebContactOverviewComponent
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
           component: WebContactDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebContactOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-contact-edit/web-contact-edit.module').then((m) => m.WebContactEditModule),
            },
          {
                  path: 'contact-emails',
                  loadChildren: () => import('@case-clinical/web/contact-email/feature').then((m) => m.WebContactEmailFeatureModule),
                },
          {
                  path: 'contact-phone-numbers',
                  loadChildren: () => import('@case-clinical/web/contact-phone-number/feature').then((m) => m.WebContactPhoneNumberFeatureModule),
                },
          {
                  path: 'contact-settings',
                  loadChildren: () => import('@case-clinical/web/contact-setting/feature').then((m) => m.WebContactSettingFeatureModule),
                },
          {
                  path: 'contact-tags',
                  loadChildren: () => import('@case-clinical/web/contact-tag/feature').then((m) => m.WebContactTagFeatureModule),
                },
          {
                  path: 'implants',
                  loadChildren: () => import('@case-clinical/web/implant/feature').then((m) => m.WebImplantFeatureModule),
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
export class WebContactDetailModule {}
