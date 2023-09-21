import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { FuseCardModule } from '@fuse/components/card'
import { SharedModule } from 'libs/shared/shared.module'
import { AuthSignOutComponent } from './sign-out.component'
import { authSignOutRoutes } from './sign-out.routing'

@NgModule({
    declarations: [AuthSignOutComponent],
    imports: [RouterModule.forChild(authSignOutRoutes), MatButtonModule, FuseCardModule, SharedModule],
})
export class AuthSignOutModule {}
