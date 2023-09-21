import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { FuseDrawerModule } from '@fuse/components/drawer'
import { FuseScrollbarModule } from '@fuse/directives/scrollbar'
import { SharedModule } from 'libs/shared/shared.module'
import { QuickChatComponent } from './quick-chat.component'
import { WebUiLaIconModule } from '@case-clinical/web/ui/la-icon'

@NgModule({
    declarations: [QuickChatComponent],
    imports: [
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseDrawerModule,
        FuseScrollbarModule,
        SharedModule,
        WebUiLaIconModule,
    ],
    exports: [QuickChatComponent],
})
export class QuickChatModule {}
