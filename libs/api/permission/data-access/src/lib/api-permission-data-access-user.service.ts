
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreatePermissionInput } from './dto/user-create-permission.input'
import { UserListPermissionInput } from './dto/user-list-permission.input'
import { UserUpdatePermissionInput } from './dto/user-update-permission.input'


@Injectable()
export class ApiPermissionDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userPermissions(userId: string, input?: UserListPermissionInput) {

    return this.data.permission.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPermissions(userId: string, input?: UserListPermissionInput) {
    return this.data.permission.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPermissions(userId: string, input?: UserListPermissionInput): Promise<CorePaging> {

    const total = await this.data.permission.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPermission(userId: string, permissionId) {

    return this.data.permission.findUnique({ where: { id: permissionId }  })
  }

  async userCreatePermission(userId: string, input: UserCreatePermissionInput) {

    return this.data.permission.create({
      data: { 
name: input.name, 

}

    })
  }

  
  

  async userUpdatePermission(userId: string, permissionId: string, input: UserUpdatePermissionInput) {

    return this.data.permission.update({
      where: { id: permissionId },
      data: {
      name: input.name
}

    })
  }

  async userDeletePermission(userId: string, permissionId: string) {
    return this.data.permission.delete({ where: { id: permissionId } })
  }
}

