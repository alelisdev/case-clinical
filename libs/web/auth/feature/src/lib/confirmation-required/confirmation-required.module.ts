import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { FuseCardModule } from '@fuse/components/card'
import { SharedModule } from 'libs/shared/shared.module'
import { AuthConfirmationRequiredComponent } from './confirmation-required.component'
import { authConfirmationRequiredRoutes } from './confirmation-required.routing'

@NgModule({
    declarations: [AuthConfirmationRequiredComponent],
    imports: [RouterModule.forChild(authConfirmationRequiredRoutes), MatButtonModule, FuseCardModule, SharedModule],
})
export class AuthConfirmationRequiredModule {}
