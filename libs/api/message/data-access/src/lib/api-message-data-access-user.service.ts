
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateMessageInput } from './dto/user-create-message.input'
import { UserListMessageInput } from './dto/user-list-message.input'
import { UserUpdateMessageInput } from './dto/user-update-message.input'


@Injectable()
export class ApiMessageDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userMessages(userId: string, input?: UserListMessageInput) {

    return this.data.message.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            userId: input?.userId,
chatId: input?.chatId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { user: true, chat: true }
    })
  }


  async userCountMessages(userId: string, input?: UserListMessageInput): Promise<CorePaging> {

    const total = await this.data.message.count(
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

  async userMessage(userId: string, messageId) {

    return this.data.message.findUnique({ where: { id: messageId } ,include: { user: true, chat: true } })
  }

  async userCreateMessage(userId: string, input: UserCreateMessageInput) {

    return this.data.message.create({
      data: { 
  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,  
                chat: 
                input.chatId != null
                ? {
                        connect:  { 
                            id: input.chatId
                        }
                    }: undefined,name: input.name, 
image: input.image, 
title: input.title, 
description: input.description, 
time: input.time, 
read: input.read, 
isMine: input.isMine, 

}
,include: { user: true, chat: true }
    })
  }

  
  

  async userUpdateMessage(userId: string, messageId: string, input: UserUpdateMessageInput) {

    return this.data.message.update({
      where: { id: messageId },
      data: {
      name: input.name,
      image: input.image,
      title: input.title,
      description: input.description,
      time: input.time,
      read: input.read,
      isMine: input.isMine,
      userId: input?.userId,
      chatId: input?.chatId
}
,include: { user: true, chat: true }
    })
  }

  async userDeleteMessage(userId: string, messageId: string) {
    return this.data.message.delete({ where: { id: messageId } })
  }
}

