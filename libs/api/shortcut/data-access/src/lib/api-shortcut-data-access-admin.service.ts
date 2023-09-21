
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateShortcutInput } from './dto/admin-create-shortcut.input'
import { AdminListShortcutInput } from './dto/admin-list-shortcut.input'

import { AdminUpdateShortcutInput } from './dto/admin-update-shortcut.input'

@Injectable()
export class ApiShortcutDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminShortcuts(adminId: string, input?: AdminListShortcutInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.shortcut.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { user: true }
    })
  }

  async adminCountShortcuts(adminId: string, input?: AdminListShortcutInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

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

  
  

  async adminShortcut(adminId: string, shortcutId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.shortcut.findUnique({ where: { id: shortcutId } ,include: { user: true }})
  }

  async adminCreateShortcut(adminId: string, input: AdminCreateShortcutInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminUpdateShortcut(adminId: string, shortcutId, input: AdminUpdateShortcutInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminDeleteShortcut(adminId: string, shortcutId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.shortcut.delete({ where: { id: shortcutId } })
  }
}

