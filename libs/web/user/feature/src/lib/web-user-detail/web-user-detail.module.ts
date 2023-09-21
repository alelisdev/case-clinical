
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
import { WebUserDetailComponent } from './web-user-detail.component'
import { WebUserOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebUserDetailComponent,

    WebUserOverviewComponent
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
           component: WebUserDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebUserOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-user-edit/web-user-edit.module').then((m) => m.WebUserEditModule),
            },
          {
                  path: 'assigned-documents',
                  loadChildren: () => import('@case-clinical/web/assigned-document/feature').then((m) => m.WebAssignedDocumentFeatureModule),
                },
          {
                  path: 'chats',
                  loadChildren: () => import('@case-clinical/web/chat/feature').then((m) => m.WebChatFeatureModule),
                },
          {
                  path: 'documents',
                  loadChildren: () => import('@case-clinical/web/document/feature').then((m) => m.WebDocumentFeatureModule),
                },
          {
                  path: 'messages',
                  loadChildren: () => import('@case-clinical/web/message/feature').then((m) => m.WebMessageFeatureModule),
                },
          {
                  path: 'navigations',
                  loadChildren: () => import('@case-clinical/web/navigation/feature').then((m) => m.WebNavigationFeatureModule),
                },
          {
                  path: 'notifications',
                  loadChildren: () => import('@case-clinical/web/notification/feature').then((m) => m.WebNotificationFeatureModule),
                },
          {
                  path: 'prior-authorization-requests',
                  loadChildren: () => import('@case-clinical/web/prior-authorization-request/feature').then((m) => m.WebPriorAuthorizationRequestFeatureModule),
                },
          {
                  path: 'settings',
                  loadChildren: () => import('@case-clinical/web/setting/feature').then((m) => m.WebSettingFeatureModule),
                },
          {
                  path: 'shortcuts',
                  loadChildren: () => import('@case-clinical/web/shortcut/feature').then((m) => m.WebShortcutFeatureModule),
                },
          {
                  path: 'team-users',
                  loadChildren: () => import('@case-clinical/web/team-user/feature').then((m) => m.WebTeamUserFeatureModule),
                },
          {
                  path: 'user-features',
                  loadChildren: () => import('@case-clinical/web/user-feature/feature').then((m) => m.WebUserFeatureFeatureModule),
                },
          {
                  path: 'user-feature-permissions',
                  loadChildren: () => import('@case-clinical/web/user-feature-permission/feature').then((m) => m.WebUserFeaturePermissionFeatureModule),
                },
          {
                  path: 'user-roles',
                  loadChildren: () => import('@case-clinical/web/user-role/feature').then((m) => m.WebUserRoleFeatureModule),
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
export class WebUserDetailModule {}
