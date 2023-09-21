
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateNavigationInput } from './dto/admin-create-navigation.input'
import { AdminListNavigationInput } from './dto/admin-list-navigation.input'
import { AdminUpdateNavigationInput } from './dto/admin-update-navigation.input'

@Injectable()
export class ApiNavigationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminNavigations(adminId: string, input?: AdminListNavigationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.navigation.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {children: true, user: true, parent: true} 
    })
  }

  async adminCountNavigations(adminId: string, input?: AdminListNavigationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.navigation.count(
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

  
  async adminNavigationNavigations(adminId: string, input?: AdminListNavigationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.navigation.findMany({
      where: { 
        AND: [
          { 
            name: { 
                contains: input?.name
            }
          },
          { parentId: input.parentId}
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  
  async adminCountNavigationNavigations(adminId: string, input?: AdminListNavigationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.navigation.count({where: {parentId: input.parentId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async adminNavigation(adminId: string, navigationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.navigation.findUnique({ where: { id: navigationId } , include: {children: true, user: true, parent: true} })
  }

  async adminCreateNavigation(adminId: string, input: AdminCreateNavigationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.navigation.create({
      data: { 
  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,  
                parent: 
                input.parentId != null
                ? {
                        connect:  { 
                            id: input.parentId
                        }
                    }: undefined,  children:  input.children != null
                    ? {
                    createMany: {
                        data: {
                            ...input.children,
                        },
                    },
                }: undefined,name: input.name, 
title: input.title, 
subtitle: input.subtitle, 
type: input.type, 
icon: input.icon, 
link: input.link, 

}
, include: {children: true, user: true, parent: true} 
    })
  }

  async adminUpdateNavigation(adminId: string, navigationId, input: AdminUpdateNavigationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.navigation.update({
      where: { id: navigationId },
      data: {
      name: input.name,
      title: input.title,
      subtitle: input.subtitle,
      type: input.type,
      icon: input.icon,
      link: input.link,
      userId: input.userId,
      parentId: input.parentId
}
, include: {children: true, user: true, parent: true} 
    })
  }

  async adminDeleteNavigation(adminId: string, navigationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.navigation.delete({ where: { id: navigationId } })
  }
}

