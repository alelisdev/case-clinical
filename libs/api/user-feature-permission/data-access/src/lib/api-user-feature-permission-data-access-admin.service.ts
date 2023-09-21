
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, ApiCoreSharedService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateUserFeaturePermissionInput } from './dto/admin-create-user-feature-permission.input'
import { AdminListUserFeaturePermissionInput } from './dto/admin-list-user-feature-permission.input'
import { AdminListFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateUserFeaturePermissionInput } from './dto/admin-update-user-feature-permission.input'
import { AdminUserFeaturePermissionUpdateInput } from './dto/admin-user-feature-permission-update.input'

@Injectable()
export class ApiUserFeaturePermissionDataAccessAdminService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async adminUpdateUserRoles(adminId: string, userId: string, input: AdminUserFeaturePermissionUpdateInput) {
    await this.data.ensureAdminUser(adminId)

    let featureCount = 0;
    let featurePermissionCount = 0;

    /** Update UserRole Table **/
    // Delete Old UserRoles
    await this.data.userRole.deleteMany({
      where: { userId }
    })
    // Create UserRoles Table Rows
    await this.data.userRole.createMany({
      data: input.roleIds.map(roleId => ({ roleId, userId }))
    })
    /** Update UserRole Table **/

    /** Update User Feature Table **/
    // Delete old userFeature table rows first
    await this.data.userFeature.deleteMany({
      where: { userId: userId }
    })
    // Fetch RoleFeatures
    const roleFeatures = await this.data.roleFeature.findMany({
      where: {
        roleId: {
          in: input.roleIds
        }
      }
    })
    // Extract FeatureIds
    const featureIds = roleFeatures.map((feature) => feature.featureId)
    // Remove duplicate featureIds, because any couple of roles can have dumplicate features.
    const uniqueFeatureIds = [ ...(new Set(featureIds)) ]
    // Assing featureIds to the user
    if(uniqueFeatureIds.length > 0) {
      const featureCreateResult = await this.data.userFeature.createMany({
        data: uniqueFeatureIds.map((featureId) => ({ featureId: featureId, userId: userId, name: `${userId}.${featureId}` }))
      })
      featureCount = featureCreateResult.count;
    }
    /** Update User Feature Table **/

    /** Update User Feature Permissions Table **/
    // Delete old usre feature permisions
    await this.data.userFeaturePermission.deleteMany({
      where: { userId: userId }
    })
    // Fetch roleFeaturePermissions
    const roleFeaturePermissions = await this.data.roleFeaturePermission.findMany({
      where: {
        roleId: { in: input.roleIds }
      }
    })
    const featurePermissionIds = roleFeaturePermissions.map((featurePermission) => featurePermission.featurePermissionId)
    // Remove duplicate featureIds, because any couple of roles can have dumplicate features.
    const uniqueFeaturePermissionIds = [ ...(new Set(featurePermissionIds)) ]

    // Assing featurePermissionIds to the user
    if(uniqueFeaturePermissionIds.length > 0) {
      const featurePermissionCreateResult = await this.data.userFeaturePermission.createMany({
        data: uniqueFeaturePermissionIds.map((featurePermissionId) => ({ featurePermissionId, userId, name: featurePermissionId }))
      })
      featurePermissionCount = featurePermissionCreateResult.count;
    }

    await this.data.adminUpdateUserNavigations(userId, input.roleIds)

    /** Update User Feature Permissions Table **/
    return {
      featureCount: featureCount,
      featurePermissionCount: featurePermissionCount
    }
  }


  async adminUserFeaturePermissions(adminId: string, input?: AdminListUserFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeaturePermission.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { featurePermission: true, user: true }
    })
  }

  async adminCountUserFeaturePermissions(adminId: string, input?: AdminListUserFeaturePermissionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.userFeaturePermission.count(
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

  
  

  async adminUserFeaturePermission(adminId: string, userFeaturePermissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeaturePermission.findUnique({ where: { id: userFeaturePermissionId } ,include: { featurePermission: true, user: true }})
  }

  async adminCreateUserFeaturePermission(adminId: string, input: AdminCreateUserFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminUpdateUserFeaturePermission(adminId: string, userFeaturePermissionId, input: AdminUpdateUserFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminDeleteUserFeaturePermission(adminId: string, userFeaturePermissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeaturePermission.delete({ where: { id: userFeaturePermissionId } })
  }
}

