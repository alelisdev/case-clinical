
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateMessageInput } from './dto/admin-create-message.input'
import { AdminListMessageInput } from './dto/admin-list-message.input'

import { AdminUpdateMessageInput } from './dto/admin-update-message.input'

@Injectable()
export class ApiMessageDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminMessages(adminId: string, input?: AdminListMessageInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.message.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { user: true, chat: true }
    })
  }

  async adminCountMessages(adminId: string, input?: AdminListMessageInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

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

  
  

  async adminMessage(adminId: string, messageId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.message.findUnique({ where: { id: messageId } ,include: { user: true, chat: true }})
  }

  async adminCreateMessage(adminId: string, input: AdminCreateMessageInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminUpdateMessage(adminId: string, messageId, input: AdminUpdateMessageInput) {
    await this.data.ensureAdminUser(adminId)

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
      userId: input.userId,
      chatId: input.chatId
}
,include: { user: true, chat: true }
    })
  }

  async adminDeleteMessage(adminId: string, messageId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.message.delete({ where: { id: messageId } })
  }
}

