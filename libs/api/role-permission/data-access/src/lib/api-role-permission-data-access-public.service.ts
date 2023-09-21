
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRolePermissionInput } from './dto/user-list-role-permission.input'

@Injectable()
export class ApiRolePermissionDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRolePermissions(input?: UserListRolePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.rolePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
            permissionId: input.permissionId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {permission: true}
    })
  }

  async publicSelectRolePermissions(input?: UserListRolePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.rolePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
            permissionId: input.permissionId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRolePermissions(input?: UserListRolePermissionInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.rolePermission.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            permissionId: input.permissionId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRolePermission(rolePermissionId) {

    return this.data.rolePermission.findUnique({ where: { id: rolePermissionId } , include: {permission: true}  })
  }
}


