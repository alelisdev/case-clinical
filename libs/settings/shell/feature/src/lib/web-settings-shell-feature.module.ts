
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtraOptions,PreloadAllModules, Route, RouterModule, Routes } from '@angular/router'
import { IsAdminGuard,IsLoggedInGuard, WebAuthDataAccessModule } from '@case-clinical/web/auth/data-access'
import { LayoutComponent } from 'libs/web/layout/feature/web-layout/src/lib/layout.component'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MarkdownModule } from 'ngx-markdown'
import { FuseModule } from '@fuse/fuse.module'
import { FuseConfigModule } from '@fuse/services/config/config.module'
import { FuseMockApiModule } from '@fuse/lib/mock-api'
import { CoreModule } from 'libs/web/core/core.module'
import { appConfig } from 'libs/web/core/config/src'
import { LayoutModule } from '@case-clinical/web-layout'
import { AuthGuard } from 'libs/web/core/auth/src/lib/guards/auth.guard'
import { mockApiServices } from 'libs/web/mock-api';
import { InitialDataResolver } from '@case-clinical/web/core/data-access'
import { WebAuthFeatureModule } from '@case-clinical/web/auth/feature'


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

  // Redirect empty path to '/dashboards/project'
  {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},
  // Redirect signed in user to the '/dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},

  // Landing routes
  {
      path: '',
      component  : LayoutComponent,
      data: {
          layout: 'empty'
      },
      children   : [
          {path: 'home', loadChildren: () => import('libs/web/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
      ]
  },

  // Admin routes
  {
      path: '',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      component  : LayoutComponent,
      resolve    : {
          initialData: InitialDataResolver,
      },
      children: [
        {
          path: 'settings', loadChildren: () => import('@case-clinical/web/auth/feature').then(m => m.SettingsModule)
        },
//         // Dashboards
//         {
//           path: 'dashboards', children: [
//             { path: 'project', loadChildren: () => import('@case-clinical/web/modules').then(m => m.ProjectModule) },
//             { path: 'cube-dashboard', loadChildren: () => import('@case-clinical/web/modules').then(m => m.CubeDashboardModule) },
//           ]
//         },
//           {path: 'queues', children: [
// {path: 'batch-controls', loadChildren: () => import('@case-clinical/web/batch-control/feature').then(m => m.WebBatchControlFeatureModule)},
// {path: 'legal-cases', loadChildren: () => import('@case-clinical/web/legal-case/feature').then(m => m.WebLegalCaseFeatureModule)},
// {path: 'organizations', loadChildren: () => import('@case-clinical/web/organization/feature').then(m => m.WebOrganizationFeatureModule)},
// {path: 'patients', loadChildren: () => import('@case-clinical/web/patient/feature').then(m => m.WebPatientFeatureModule)}
//           ]},
      ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,

    // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      paramsInheritanceStrategy: 'always',
      useHash: false,
      //enableTracing: true,
      //preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
    WebAuthDataAccessModule,
    WebAuthFeatureModule

  ],
})
export class WebSettingsShellFeatureModule {}
