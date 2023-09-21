
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreatePermissionInput } from './dto/admin-create-permission.input'
import { AdminListPermissionInput } from './dto/admin-list-permission.input'

import { AdminUpdatePermissionInput } from './dto/admin-update-permission.input'

@Injectable()
export class ApiPermissionDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPermissions(adminId: string, input?: AdminListPermissionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.permission.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPermissions(adminId: string, input?: AdminListPermissionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.permission.count(
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

  
  

  async adminPermission(adminId: string, permissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.permission.findUnique({ where: { id: permissionId } })
  }

  async adminCreatePermission(adminId: string, input: AdminCreatePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.permission.create({
      data: { 
name: input.name, 

}

    })
  }

  async adminUpdatePermission(adminId: string, permissionId, input: AdminUpdatePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.permission.update({
      where: { id: permissionId },
      data: {
      name: input.name
}

    })
  }

  async adminDeletePermission(adminId: string, permissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.permission.delete({ where: { id: permissionId } })
  }
}

