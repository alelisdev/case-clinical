import { Route } from '@angular/router';
import { ChatChatResolver, ChatChatsResolver, ChatContactsResolver, ChatProfileResolver } from 'libs/web/modules/admin/apps/chat/chat.resolvers';
import { ChatComponent } from 'libs/web/modules/admin/apps/chat/chat.component';
import { ChatsComponent } from 'libs/web/modules/admin/apps/chat/chats/chats.component';
import { ConversationComponent } from 'libs/web/modules/admin/apps/chat/conversation/conversation.component';

export const chatRoutes: Route[] = [
    {
        path     : '',
        component: ChatComponent,
        resolve  : {
            chats   : ChatChatsResolver,
            contacts: ChatContactsResolver,
            profile : ChatProfileResolver
        },
        children : [
            {
                path     : '',
                component: ChatsComponent,
                children : [
                    {
                        path     : '',
                        component: ConversationComponent,
                        children : [
                            {
                                path   : ':id',
                                resolve: {
                                    conversation: ChatChatResolver
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
