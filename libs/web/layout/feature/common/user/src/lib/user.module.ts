import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { UserComponent } from './user.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'libs/shared/shared.module'

@NgModule({
    declarations: [UserComponent],
    imports: [MatButtonModule, RouterModule, MatDividerModule, MatIconModule, MatMenuModule, SharedModule],
    exports: [UserComponent],
})
export class UserModule {}
