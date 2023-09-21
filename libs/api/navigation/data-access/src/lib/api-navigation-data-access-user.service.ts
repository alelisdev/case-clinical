
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateNavigationInput } from './dto/user-create-navigation.input'
import { UserListNavigationInput } from './dto/user-list-navigation.input'
import { UserUpdateNavigationInput } from './dto/user-update-navigation.input'

@Injectable()
export class ApiNavigationDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userNavigations(userId: string, input?: UserListNavigationInput) {

    return this.data.navigation.findMany({
      where: {
        userId
          },
      take: input?.limit,
      skip: input?.skip , include: {children: true, user: true, parent: true} 
    })
  }


  async userCountNavigations(userId: string, input?: UserListNavigationInput): Promise<CorePaging> {

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

  async userNavigation(userId: string, navigationId) {

    return this.data.navigation.findUnique({ where: { id: navigationId } , include: {children: true, user: true, parent: true}  })
  }

  async userCreateNavigation(userId: string, input: UserCreateNavigationInput) {

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

  
  async userNavigationNavigations(userId: string, input?: UserListNavigationInput) {

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

  
  async userCountNavigationNavigations(userId: string, input?: UserListNavigationInput): Promise<CorePaging> {

    const total = await this.data.navigation.count({where: {parentId: input.parentId}})
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }



  async userUpdateNavigation(userId: string, navigationId: string, input: UserUpdateNavigationInput) {

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

  async userDeleteNavigation(userId: string, navigationId: string) {
    return this.data.navigation.delete({ where: { id: navigationId } })
  }
}

