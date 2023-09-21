import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'libs/shared/shared.module';
import { ChatComponent } from './chat.component';
import { chatRoutes } from './chat.routing';
import { ChatsComponent } from './chats/chats.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadChatInputModule } from 'libs/web/ui/form/src/lib/types/file-upload-chat-input/file-upload-chat-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebUiFilePreviewModule } from 'libs/web/ui/file-preview/web-ui-file-preview.module';
import { ChatStore } from './chat.store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { NoConversationComponent } from './no-conversation/no-conversation.component';
import { GroupInfoComponent } from './group-info/group-info.component';

@NgModule({
    declarations: [
        ChatComponent,
        ChatsComponent,
        ContactInfoComponent,
        GroupInfoComponent,
        ConversationComponent,
        NewChatComponent,
        ProfileComponent,
        NoConversationComponent
    ],
    imports     : [
        RouterModule.forChild(chatRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSidenavModule,
        MatTooltipModule,
        MatProgressBarModule,
        SharedModule,
        FileUploadChatInputModule,
        FormsModule,
        ReactiveFormsModule,
        WebUiFilePreviewModule,
        HttpClientModule
    ],
    // providers: [ChatStore]
})
export class ChatModule
{
}
