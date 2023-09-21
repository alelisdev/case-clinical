
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateFeaturePermissionInput } from './dto/admin-create-feature-permission.input'
import { AdminListFeaturePermissionInput } from './dto/admin-list-feature-permission.input'
import { AdminListFeatureInput } from '@case-clinical/api/feature/data-access'
import { AdminListPermissionInput } from '@case-clinical/api/permission/data-access'
import { AdminUpdateFeaturePermissionInput } from './dto/admin-update-feature-permission.input'

@Injectable()
export class ApiFeaturePermissionDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminFeaturePermissions(adminId: string, input?: AdminListFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.featurePermission.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { feature: true, permission: true }
    })
  }

  async adminCountFeaturePermissions(adminId: string, input?: AdminListFeaturePermissionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.featurePermission.count(
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

  
  

  async adminFeaturePermission(adminId: string, featurePermissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.featurePermission.findUnique({ where: { id: featurePermissionId } ,include: { feature: true, permission: true }})
  }

  async adminCreateFeaturePermission(adminId: string, input: AdminCreateFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminUpdateFeaturePermission(adminId: string, featurePermissionId, input: AdminUpdateFeaturePermissionInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminDeleteFeaturePermission(adminId: string, featurePermissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.featurePermission.delete({ where: { id: featurePermissionId } })
  }
}

