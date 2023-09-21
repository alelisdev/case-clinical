
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateUserFeaturePermissionInput } from './dto/user-create-user-feature-permission.input'
import { UserListUserFeaturePermissionInput } from './dto/user-list-user-feature-permission.input'
import { UserUpdateUserFeaturePermissionInput } from './dto/user-update-user-feature-permission.input'
import { UserListFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access'
import { UserListUserInput } from '@case-clinical/api/user/data-access'

@Injectable()
export class ApiUserFeaturePermissionDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userUserFeaturePermissions(userId: string, input?: UserListUserFeaturePermissionInput) {

    return this.data.userFeaturePermission.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            featurePermissionId: input.featurePermissionId,
userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { featurePermission: true, user: true }
    })
  }

  async userSelectUserFeaturePermissions(userId: string, input?: UserListUserFeaturePermissionInput) {
    return this.data.userFeaturePermission.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            featurePermissionId: input.featurePermissionId,
userId: input.userId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountUserFeaturePermissions(userId: string, input?: UserListUserFeaturePermissionInput): Promise<CorePaging> {

    const total = await this.data.userFeaturePermission.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
            featurePermissionId: input.featurePermissionId,
userId: input.userId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUserFeaturePermission(userId: string, userFeaturePermissionId) {

    return this.data.userFeaturePermission.findUnique({ where: { id: userFeaturePermissionId } ,include: { featurePermission: true, user: true } })
  }

  async userCreateUserFeaturePermission(userId: string, input: UserCreateUserFeaturePermissionInput) {

    return this.data.userFeaturePermission.create({
      data: { 
  
                featurePermission: 
                input.featurePermissionId != null
                ? {
                        connect:  { 
                            id: input.featurePermissionId
                        }
                    }: undefined,  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,name: input.name, 

}
,include: { featurePermission: true, user: true }
    })
  }

  
  

  async userUpdateUserFeaturePermission(userId: string, userFeaturePermissionId: string, input: UserUpdateUserFeaturePermissionInput) {

    return this.data.userFeaturePermission.update({
      where: { id: userFeaturePermissionId },
      data: {
      name: input.name,
      featurePermissionId: input.featurePermissionId,
      userId: input.userId
}
,include: { featurePermission: true, user: true }
    })
  }

  async userDeleteUserFeaturePermission(userId: string, userFeaturePermissionId: string) {
    return this.data.userFeaturePermission.delete({ where: { id: userFeaturePermissionId } })
  }

  async userUpdateUserFeaturePermissions(userId: string, userFeaturePermissions: UserUpdateUserFeaturePermissionInput[]) {
    await this.data.userFeaturePermission.updateMany({
      where: { userId: userId },
      data: userFeaturePermissions
  })
  }
}

