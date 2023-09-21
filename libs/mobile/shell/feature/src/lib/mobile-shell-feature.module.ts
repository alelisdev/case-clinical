import { NgModule } from '@angular/core'
import { PreloadAllModules, RouteReuseStrategy, RouterModule, Routes } from '@angular/router'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { MobileAuthDataAccessModule, IsLoggedInGuard } from '@case-clinical/mobile/auth/data-access'
import { MobileCoreFeatureModule } from '@case-clinical/mobile/core/feature'
import { MobileLayoutFeatureComponent } from '@case-clinical/mobile/layout/feature'

const routes: Routes = [
  {
    path: '',
    component: MobileLayoutFeatureComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      // Application routes here
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'about',
        loadChildren: () => import('@case-clinical/mobile/about/feature').then((m) => m.MobileAboutFeatureModule),
      },
      {
        path: 'account',
        loadChildren: () => import('@case-clinical/mobile/account/feature').then((m) => m.MobileAccountFeatureModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@case-clinical/mobile/dashboard/feature').then((m) => m.MobileDashboardFeatureModule),
      },
      {
        path: 'not-found',
        loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
  {
    path: '',
    loadChildren: () => import('@case-clinical/mobile/auth/feature').then((m) => m.MobileAuthFeatureModule),
  },
  { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  providers: [StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  imports: [
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules,
    }),
    MobileAuthDataAccessModule,
    MobileCoreFeatureModule,
  ],
})
export class MobileShellFeatureModule {}
