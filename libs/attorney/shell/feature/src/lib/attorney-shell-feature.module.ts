import { appConfig } from '@case-clinical/core/config'
import { AuthGuard } from '@case-clinical/core/auth'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { CoreModule } from '@case-clinical/core'
import { FuseConfigModule } from '@fuse/services/config/config.module'
import { FuseMockApiModule } from '@fuse/lib/mock-api'
import { FuseModule } from '@fuse/fuse.module'
import { AttorneyInitialDataResolver } from '@case-clinical/web/core/data-access'
import { LayoutComponent } from 'libs/web/layout/feature/web-layout/src/lib/layout.component'
import { LayoutModule } from '@case-clinical/web-layout'
import { MarkdownModule } from 'ngx-markdown'
import { mockApiServices } from 'libs/web/mock-api';
import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { WebAuthDataAccessModule } from '@case-clinical/web/auth/data-access'
import { WebAuthFeatureModule } from '@case-clinical/web/auth/feature'


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

  // Redirect empty path to '/dashboards/project'
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  // Redirect signed in user to the '/dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      // { path: 'home', loadChildren: () => import('libs/web/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
      { path: 'form-builder-example', loadChildren: () => import('libs/web/modules/admin/form-builder-test/form-builder-example.module').then(m => m.JsonFormBuilderExampleModule) },
      // { path: 'web-templates', loadChildren: () => import('libs/web/modules/admin/web-templates/web-templates.module').then(m => m.WebTemplatesModule) },
      { path: 'preview/:config', loadChildren: () => import('@case-clinical/web/ui/formly-designer-preview').then(m => m.JsonFormPreviewModule) },
    ]
  },

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '', loadChildren: () => import('@case-clinical/attorney/pages').then(m => m.AttorneyPagesModule),
      },
    ],
    data: {
      layout: 'empty'
    },
    resolve: {
      initialData: AttorneyInitialDataResolver,
    },
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
export class WebAttorneyShellFeatureModule { }
