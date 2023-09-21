
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateChatInput } from './dto/admin-create-chat.input'
import { AdminListChatInput } from './dto/admin-list-chat.input'
import { AdminListMessageInput } from '@case-clinical/api/message/data-access'
import { AdminUpdateChatInput } from './dto/admin-update-chat.input'

@Injectable()
export class ApiChatDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminChats(adminId: string, input?: AdminListChatInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.chat.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {messages: true, user: true} 
    })
  }

  async adminCountChats(adminId: string, input?: AdminListChatInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.chat.count(
    {
      where: { 
            name: { 
                contains: input?.name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  async adminChatMessages(adminId: string, input?: AdminListMessageInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.message.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { chatId: input.chatId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  
  async adminCountChatMessages(adminId: string, input?: AdminListMessageInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.message.count({where: {chatId: input.chatId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminChat(adminId: string, chatId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.chat.findUnique({ where: { id: chatId } , include: {messages: true, user: true} })
  }

  async adminCreateChat(adminId: string, input: AdminCreateChatInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.chat.create({
      data: { 
  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,  messages:  input.messages != null
                    ? {
                    createMany: {
                        data: {
                            ...input.messages,
                        },
                    },
                }: undefined,name: input.name, 
unreadCount: input.unreadCount, 
muted: input.muted, 
lastMessage: input.lastMessage, 
lastMessageAt: input.lastMessageAt, 

}
, include: {messages: true, user: true} 
    })
  }

  async adminUpdateChat(adminId: string, chatId, input: AdminUpdateChatInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.chat.update({
      where: { id: chatId },
      data: {
      name: input.name,
      userId: input.userId,
      unreadCount: input.unreadCount,
      muted: input.muted,
      lastMessage: input.lastMessage,
      lastMessageAt: input.lastMessageAt
}
, include: {messages: true, user: true} 
    })
  }

  async adminDeleteChat(adminId: string, chatId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.chat.delete({ where: { id: chatId } })
  }
}

