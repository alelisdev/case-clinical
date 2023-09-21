import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FuseCardModule } from '@fuse/components/card'
import { FuseAlertModule } from '@fuse/components/alert'
import { SharedModule } from 'libs/shared/shared.module'
import { AuthSignUpComponent } from './sign-up.component'
import { authSignupRoutes } from './sign-up.routing'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer'

@NgModule({
    declarations: [AuthSignUpComponent],
    imports: [
        RouterModule.forChild(authSignupRoutes),
        DocumentViewerModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
    ],
})
export class AuthSignUpModule {}
