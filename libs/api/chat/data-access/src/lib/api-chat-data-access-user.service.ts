
import { BadRequestException, Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateChatInput } from './dto/user-create-chat.input'
import { UserListChatInput } from './dto/user-list-chat.input'
import { UserUpdateChatInput } from './dto/user-update-chat.input'
import { UserListMessageInput } from '@case-clinical/api/message/data-access'

@Injectable()
export class ApiChatDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userChats(userId: string, input?: UserListChatInput) {

    return this.data.chat.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {messages: true, user: true} 
    })
  }


  async userCountChats(userId: string, input?: UserListChatInput): Promise<CorePaging> {

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

  async userChat(userId: string, chatId) {

    return this.data.chat.findUnique({ where: { id: chatId } , include: {messages: true, user: true}  })
  }

  async userCreateChat(userId: string, input: UserCreateChatInput) {

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

  
  async userChatMessages(userId: string, input?: UserListMessageInput) {

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

  
  async userCountChatMessages(userId: string, input?: UserListMessageInput): Promise<CorePaging> {

    const total = await this.data.message.count({where: {chatId: input.chatId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async userUpdateChat(userId: string, chatId: string, input: UserUpdateChatInput) {

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

  async userDeleteChat(userId: string, chatId: string) {

    const messageCount = await this.data.message.count({ where: { chatId: chatId }})
    if(messageCount > 0) {
      throw new BadRequestException('Record cannot be deleted because it is referenced on a Message')
    }
  
    return this.data.chat.delete({ where: { id: chatId } })
  }
}

