import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { LanguagesModule } from '@fuse/services/language';
import { MessagesModule } from '@fuse/services/messages';
import { NotificationsModule } from '@fuse/services/notifications';
import { QuickChatModule } from '@fuse/services/quick-chat';
import { SearchModule } from '@fuse/services/search';
import { ShortcutsModule } from '@fuse/services/shortcuts';
import { UserModule } from '@fuse/services/user';
import { SharedModule } from 'libs/shared/shared.module';
import { ClassyLayoutComponent } from './classy.component';

@NgModule({
    declarations: [
        ClassyLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        LanguagesModule,
        MessagesModule,
        NotificationsModule,
        QuickChatModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        ClassyLayoutComponent
    ]
})
export class ClassyLayoutModule
{
}
