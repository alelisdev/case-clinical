
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateRoleInput } from './dto/admin-create-role.input'
import { AdminListRoleInput } from './dto/admin-list-role.input'

import { AdminUpdateRoleInput } from './dto/admin-update-role.input'

@Injectable()
export class ApiRoleDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRoles(adminId: string, input?: AdminListRoleInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.role.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountRoles(adminId: string, input?: AdminListRoleInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.role.count(
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

  
  

  async adminRole(adminId: string, roleId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.role.findUnique({ where: { id: roleId } , include: {roleFeaturePermissions: true, userRoles: true} })
  }

  async checkRoleExist(roleName: string) {
    try {
      return this.data.role.findMany({ where: { name: roleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRole(adminId: string, input: AdminCreateRoleInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const roleData = await this.checkRoleExist(input.name)

      if (roleData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.role.create({
          data: { 
    name: input.name, 

    }
    , include: {roleFeaturePermissions: true, userRoles: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRole(adminId: string, roleId, input: AdminUpdateRoleInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.role.update({
      where: { id: roleId },
      data: {
name: input.name, 

}
, include: {roleFeaturePermissions: true, userRoles: true} 
    })
  }

  async adminDeleteRole(adminId: string, roleId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.role.delete({ where: { id: roleId } })
  }
}

