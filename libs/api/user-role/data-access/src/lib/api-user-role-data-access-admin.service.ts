
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateUserRoleInput } from './dto/admin-create-user-role.input'
import { AdminListUserRoleInput } from './dto/admin-list-user-role.input'
import { AdminListRoleInput } from '@case-clinical/api/role/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateUserRoleInput } from './dto/admin-update-user-role.input'

@Injectable()
export class ApiUserRoleDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminUserRoles(adminId: string, input?: AdminListUserRoleInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.userRole.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {role: true, user: true}
    })
  }

  async adminCountUserRoles(adminId: string, input?: AdminListUserRoleInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.userRole.count(
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

  
  

  async adminUserRole(adminId: string, userRoleId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.userRole.findUnique({ where: { id: userRoleId } , include: {role: true, user: true} })
  }

  async checkUserRoleExist(userRoleName: string) {
    try {
      return this.data.userRole.findMany({ where: { name: userRoleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateUserRole(adminId: string, input: AdminCreateUserRoleInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const userRoleData = await this.checkUserRoleExist(input.name)

      if (userRoleData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.userRole.create({
          data: { 
      
                role: 
                input.roleId != null
                ? {
                        connect:  { 
                            id: input.roleId
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
    , include: {role: true, user: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateUserRole(adminId: string, userRoleId, input: AdminUpdateUserRoleInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userRole.update({
      where: { id: userRoleId },
      data: {
  
                role: 
                input.roleId != null
                ? {
                        connect:  { 
                            id: input.roleId
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
, include: {role: true, user: true} 
    })
  }

  async adminDeleteUserRole(adminId: string, userRoleId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userRole.delete({ where: { id: userRoleId } })
  }
}

