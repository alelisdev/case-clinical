
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateShortcutInput } from './dto/user-create-shortcut.input'
import { UserListShortcutInput } from './dto/user-list-shortcut.input'
import { UserUpdateShortcutInput } from './dto/user-update-shortcut.input'


@Injectable()
export class ApiShortcutDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userShortcuts(userId: string, input?: UserListShortcutInput) {

    return this.data.shortcut.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { user: true }
    })
  }


  async userCountShortcuts(userId: string, input?: UserListShortcutInput): Promise<CorePaging> {

    const total = await this.data.shortcut.count(
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

  async userShortcut(userId: string, shortcutId) {

    return this.data.shortcut.findUnique({ where: { id: shortcutId } ,include: { user: true } })
  }

  async userCreateShortcut(userId: string, input: UserCreateShortcutInput) {

    return this.data.shortcut.create({
      data: { 
  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,name: input.name, 
label: input.label, 
description: input.description, 
icon: input.icon, 
link: input.link, 
useRouter: input.useRouter, 

}
,include: { user: true }
    })
  }

  
  

  async userUpdateShortcut(userId: string, shortcutId: string, input: UserUpdateShortcutInput) {

    return this.data.shortcut.update({
      where: { id: shortcutId },
      data: {
      name: input.name,
      label: input.label,
      description: input.description,
      icon: input.icon,
      link: input.link,
      useRouter: input.useRouter,
      userId: input.userId
}
,include: { user: true }
    })
  }

  async userDeleteShortcut(userId: string, shortcutId: string) {
    return this.data.shortcut.delete({ where: { id: shortcutId } })
  }
}

