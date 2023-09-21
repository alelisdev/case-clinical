
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRoleFeaturePermissionInput } from './dto/user-list-role-feature-permission.input'

@Injectable()
export class ApiRoleFeaturePermissionDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRoleFeaturePermissions(input?: UserListRoleFeaturePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.roleFeaturePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
            featurePermissionId: input.featurePermissionId,
roleId: input.roleId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {featurePermission: true, role: true}
    })
  }

  async publicSelectRoleFeaturePermissions(input?: UserListRoleFeaturePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.roleFeaturePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
            featurePermissionId: input.featurePermissionId,
roleId: input.roleId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRoleFeaturePermissions(input?: UserListRoleFeaturePermissionInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.roleFeaturePermission.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            featurePermissionId: input.featurePermissionId,
roleId: input.roleId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRoleFeaturePermission(roleFeaturePermissionId) {

    return this.data.roleFeaturePermission.findUnique({ where: { id: roleFeaturePermissionId } , include: {featurePermission: true, role: true}  })
  }
}


