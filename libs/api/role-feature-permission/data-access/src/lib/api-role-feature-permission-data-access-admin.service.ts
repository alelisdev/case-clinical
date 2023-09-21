
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateRoleFeaturePermissionInput } from './dto/admin-create-role-feature-permission.input'
import { AdminListRoleFeaturePermissionInput } from './dto/admin-list-role-feature-permission.input'
import { AdminListFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access'
import { AdminListRoleInput } from '@case-clinical/api/role/data-access'
import { AdminUpdateRoleFeaturePermissionInput } from './dto/admin-update-role-feature-permission.input'
import { AdminRoleFeaturePermissionUpdateInput } from './dto/admin-role-feature-permission-update.input'
import { ApiNavigationDataAccessAdminService } from '@case-clinical/api/navigation/data-access';


@Injectable()
export class ApiRoleFeaturePermissionDataAccessAdminService {
  constructor(private readonly data: ApiCoreSharedService
    ) {}

  async updateRolePermissions(roleId: string, input: AdminRoleFeaturePermissionUpdateInput) {
    let removedCount = 0;
    let addedCount = 0;

    const role = await this.data.role.findFirst({
      where: {
        id: roleId
      },
      select: {
        userRoles: true
      }
    });
    const userIds = role.userRoles.map(userRole => userRole.userId)
    console.log(userIds)
    // Delete permissions removed on the frontend by admin from the database
    if(input.featurePermissionIdsToRemove.length > 0) {
      const removeResult = await this.data.roleFeaturePermission.deleteMany({
        where: {
          AND: {
            roleId: roleId,
            featurePermissionId: { in: input.featurePermissionIdsToRemove }
          }
        }
      })
      removedCount = removeResult.count;

      // Delete user userFeaturePermissions
      await this.data.userFeaturePermission.deleteMany({
        where: {
          AND: {
            featurePermissionId: { in: input.featurePermissionIdsToRemove },
            userId: { in: userIds }
          }
        }
      })
    }
    // Add permissions added on the frontend by admin into the database
    if(input.featurePermissionIdsToAdd.length > 0) {
      const addResult = await this.data.roleFeaturePermission.createMany({
        data: input.featurePermissionIdsToAdd.map((featurePermissionId) => {
          return {
            featurePermissionId: featurePermissionId,
            roleId: roleId,
            name: featurePermissionId
          }
        })
      })
      addedCount = addResult.count;

      const data = [];
      input.featurePermissionIdsToAdd.map((featurePermissionId) => {
        userIds.map(userId => {
          data.push({
            featurePermissionId: featurePermissionId,
            userId,
            name: featurePermissionId
          })
        })
      })
      await this.data.userFeaturePermission.createMany({
        data
      })
    }

    // Delete all features of the role
    await this.data.roleFeature.deleteMany({
      where: { roleId: roleId }
    });
    await this.data.userFeature.deleteMany({
      where: { userId: { in: userIds } }
    })
    // Assign features selected on the frontend by admin to the role
    if(input.featureIds.length > 0) {
      await this.data.roleFeature.createMany({
        data: input.featureIds.map((featureId) => {
          return {
            featureId: featureId,
            roleId: roleId
          }
        })
      })

      const userFeatureData = [];
      input.featureIds.map((featureId) => {
        userIds.map(userId => {
          userFeatureData.push({
            featureId: featureId,
            name: featureId,
            userId
          })
        })
      })
      await this.data.userFeature.createMany({
        data: userFeatureData
      })
    }

    await this.data.adminUpdateRoleNavigations(roleId, input.featureIds)

    return {
      added: addedCount,
      removed: removedCount
    }
  }
  async adminRoleFeaturePermissions(adminId: string, input?: AdminListRoleFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.roleFeaturePermission.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {featurePermission: true, role: true}
    })
  }

  async adminCountRoleFeaturePermissions(adminId: string, input?: AdminListRoleFeaturePermissionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.roleFeaturePermission.count(
    {
      where: { 
            name: { 
                contains: name
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

  
  

  async adminRoleFeaturePermission(adminId: string, roleFeaturePermissionId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.roleFeaturePermission.findUnique({ where: { id: roleFeaturePermissionId } , include: {featurePermission: true, role: true} })
  }

  async checkRoleFeaturePermissionExist(roleFeaturePermissionName: string) {
    try {
      return this.data.roleFeaturePermission.findMany({ where: { name: roleFeaturePermissionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRoleFeaturePermission(adminId: string, input: AdminCreateRoleFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const roleFeaturePermissionData = await this.checkRoleFeaturePermissionExist(input.name)

      if (roleFeaturePermissionData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.roleFeaturePermission.create({
          data: { 
      
                featurePermission: 
                input.featurePermissionId != null
                ? {
                        connect:  { 
                            id: input.featurePermissionId
                        }
                    }: undefined,  
                role: 
                input.roleId != null
                ? {
                        connect:  { 
                            id: input.roleId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {featurePermission: true, role: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRoleFeaturePermission(adminId: string, roleFeaturePermissionId, input: AdminUpdateRoleFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.roleFeaturePermission.update({
      where: { id: roleFeaturePermissionId },
      data: {
  
                featurePermission: 
                input.featurePermissionId != null
                ? {
                        connect:  { 
                            id: input.featurePermissionId
                        }
                    }: undefined,  
                role: 
                input.roleId != null
                ? {
                        connect:  { 
                            id: input.roleId
                        }
                    }: undefined,name: input.name, 

}
, include: {featurePermission: true, role: true} 
    })
  }

  async adminDeleteRoleFeaturePermission(adminId: string, roleFeaturePermissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.roleFeaturePermission.delete({ where: { id: roleFeaturePermissionId } })
  }
}

