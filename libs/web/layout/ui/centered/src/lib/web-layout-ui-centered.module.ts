import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { FuseFullscreenModule } from '@fuse/components/fullscreen'
import { FuseLoadingBarModule } from '@fuse/components/loading-bar'
import { FuseNavigationModule } from '@fuse/components/navigation'
import { LanguagesModule } from '@fuse/services/language'
import { MessagesModule } from '@fuse/services/messages'
import { NotificationsModule } from '@fuse/services/notifications'
import { SearchModule } from '@fuse/services/search'
import { ShortcutsModule } from '@fuse/services/shortcuts'
import { UserModule } from '@fuse/services/user'
import { SharedModule } from 'libs/shared/shared.module'
import { CenteredLayoutComponent } from './web-layout-ui-centered.component'
import { QuickChatModule } from '@fuse/services/quick-chat';

@NgModule({
    declarations: [CenteredLayoutComponent],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        QuickChatModule,
        FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        LanguagesModule,
        MessagesModule,
        NotificationsModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule,
    ],
    exports: [CenteredLayoutComponent],
})
export class CenteredLayoutModule {}
