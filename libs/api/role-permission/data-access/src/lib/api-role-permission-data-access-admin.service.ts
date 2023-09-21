
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateRolePermissionInput } from './dto/admin-create-role-permission.input'
import { AdminListRolePermissionInput } from './dto/admin-list-role-permission.input'
import { AdminListPermissionInput } from '@case-clinical/api/permission/data-access'
import { AdminUpdateRolePermissionInput } from './dto/admin-update-role-permission.input'

@Injectable()
export class ApiRolePermissionDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRolePermissions(adminId: string, input?: AdminListRolePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.rolePermission.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {permission: true}
    })
  }

  async adminCountRolePermissions(adminId: string, input?: AdminListRolePermissionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.rolePermission.count(
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

  
  

  async adminRolePermission(adminId: string, rolePermissionId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.rolePermission.findUnique({ where: { id: rolePermissionId } , include: {permission: true} })
  }

  async checkRolePermissionExist(rolePermissionName: string) {
    try {
      return this.data.rolePermission.findMany({ where: { name: rolePermissionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRolePermission(adminId: string, input: AdminCreateRolePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const rolePermissionData = await this.checkRolePermissionExist(input.name)

      if (rolePermissionData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.rolePermission.create({
          data: { 
      
                permission: 
                input.permissionId != null
                ? {
                        connect:  { 
                            id: input.permissionId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {permission: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRolePermission(adminId: string, rolePermissionId, input: AdminUpdateRolePermissionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.rolePermission.update({
      where: { id: rolePermissionId },
      data: {
  
                permission: 
                input.permissionId != null
                ? {
                        connect:  { 
                            id: input.permissionId
                        }
                    }: undefined,name: input.name, 

}
, include: {permission: true} 
    })
  }

  async adminDeleteRolePermission(adminId: string, rolePermissionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.rolePermission.delete({ where: { id: rolePermissionId } })
  }
}

