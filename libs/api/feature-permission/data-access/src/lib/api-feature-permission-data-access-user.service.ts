
import { Injectable, BadRequestException } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateFeaturePermissionInput } from './dto/user-create-feature-permission.input'
import { UserListFeaturePermissionInput } from './dto/user-list-feature-permission.input'
import { UserUpdateFeaturePermissionInput } from './dto/user-update-feature-permission.input'
import { UserListFeatureInput } from '@case-clinical/api/feature/data-access'
import { UserListPermissionInput } from '@case-clinical/api/permission/data-access'

@Injectable()
export class ApiFeaturePermissionDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userFeaturePermissions(userId: string, input?: UserListFeaturePermissionInput) {

    return this.data.featurePermission.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            featureId: input.featureId,
permissionId: input.permissionId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { feature: true, permission: true }
    })
  }

  async userSelectFeaturePermissions(userId: string, input?: UserListFeaturePermissionInput) {
    return this.data.featurePermission.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            featureId: input.featureId,
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

  async userCountFeaturePermissions(userId: string, input?: UserListFeaturePermissionInput): Promise<CorePaging> {

    const total = await this.data.featurePermission.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
            featureId: input.featureId,
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

  async userFeaturePermission(userId: string, featurePermissionId) {

    return this.data.featurePermission.findUnique({ where: { id: featurePermissionId } ,include: { feature: true, permission: true } })
  }

  async userCreateFeaturePermission(userId: string, input: UserCreateFeaturePermissionInput) {

    return this.data.featurePermission.create({
      data: { 
  
                feature: 
                input.featureId != null
                ? {
                        connect:  { 
                            id: input.featureId
                        }
                    }: undefined,  
                permission: 
                input.permissionId != null
                ? {
                        connect:  { 
                            id: input.permissionId
                        }
                    }: undefined,name: input.name, 

}
,include: { feature: true, permission: true }
    })
  }

  
  

  async userUpdateFeaturePermission(userId: string, featurePermissionId: string, input: UserUpdateFeaturePermissionInput) {

    return this.data.featurePermission.update({
      where: { id: featurePermissionId },
      data: {
      name: input.name,
      featureId: input.featureId,
      permissionId: input.permissionId
}
,include: { feature: true, permission: true }
    })
  }

  async userDeleteFeaturePermission(userId: string, featurePermissionId: string) {

    const roleFeaturePermissionCount = await this.data.roleFeaturePermission.count({ where: { featurePermissionId: featurePermissionId }})
    if(roleFeaturePermissionCount > 0) {
      throw new BadRequestException('Record cannot be deleted because it is referenced on a Role Feature Permission')
    }


    const userFeaturePermissionCount = await this.data.userFeaturePermission.count({ where: { featurePermissionId: featurePermissionId }})
    if(userFeaturePermissionCount > 0) {
      throw new BadRequestException('Record cannot be deleted because it is referenced on an User Feature Permission')
    }

    return this.data.featurePermission.delete({ where: { id: featurePermissionId } })
  }
}

