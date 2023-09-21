import { RegisterGuard } from '@case-clinical/core/auth';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LayoutComponent } from 'libs/web/layout/feature/web-layout/src/lib/layout.component'
import { NoAuthGuard, AuthGuard } from '@case-clinical/core/auth'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';

@NgModule({
  imports: [
    CommonModule,
    DocumentViewerModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
          layout: 'empty'
        },
        children: [
          { path: 'confirmation-required', loadChildren: () => import('./confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
          { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
          { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
          { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.AuthSignInModule) },
          { path: 'sign-up', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
          { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
          {path: 'firm-register', loadChildren: () => import('./firm-register/firm-register.module').then(m => m.FirmRegisterModule)},
          // { path: 'sign-up-setting', loadChildren: () => import('./signup-setting/signup-setting.module').then(m => m.SignupSettingModule) },
        ]
      },

      // Auth routes for unverified users
      {
        path: '',
        canActivate: [RegisterGuard],
        canActivateChild: [RegisterGuard],
        component: LayoutComponent,
        data: {
          layout: 'empty'
        },
        children: [
          { path: 'sign-up-setting', loadChildren: () => import('./signup-setting/signup-setting.module').then(m => m.SignupSettingModule) },
        ]
      },

      // Auth routes for authenticated users
      {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
          layout: 'empty'
        },
        children: [
          { path: 'sign-out', loadChildren: () => import('./sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
          { path: 'unlock-session', loadChildren: () => import('./unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
      },
    ])
  ],
  declarations: [
  ]
})
export class WebAuthFeatureModule { }
