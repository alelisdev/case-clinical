import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FuseCardModule } from '@fuse/components/card'
import { FuseAlertModule } from '@fuse/components/alert'
import { SharedModule } from 'libs/shared/shared.module'
import { AuthForgotPasswordComponent } from './forgot-password.component'
import { authForgotPasswordRoutes } from './forgot-password.routing'

@NgModule({
    declarations: [AuthForgotPasswordComponent],
    imports: [
        RouterModule.forChild(authForgotPasswordRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
    ],
})
export class AuthForgotPasswordModule {}
