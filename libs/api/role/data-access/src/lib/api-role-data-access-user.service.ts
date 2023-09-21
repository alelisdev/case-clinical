
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRoleInput } from './dto/user-create-role.input'
import { UserListRoleInput } from './dto/user-list-role.input'
import { UserUpdateRoleInput } from './dto/user-update-role.input'
import { UserUpdateRolesInput } from './dto/user-update-roles.input'



@Injectable()
export class ApiRoleDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRoles(userId: string, input?: UserListRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.role.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectRoles(userId: string, input?: UserListRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.role.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountRoles(userId: string, input?: UserListRoleInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.role.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userRole(userId: string, roleId) {

    return this.data.role.findUnique({ where: { id: roleId } , include: {roleFeaturePermissions: true, userRoles: true}  })
  }

  async checkRoleExist(roleName: string) {
    try {
      return this.data.role.findMany({ where: { name: roleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRole(userId: string, input: UserCreateRoleInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const roleData = await this.checkRoleExist(input.name)

        if (roleData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Role', 'Create', input)

    let role = await this.data.role.create({
      data: { 
name: input.name, 

}
, include: {roleFeaturePermissions: true, userRoles: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Role', 'Create', role)

    return role

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Role')
    }

  }


  
  

  async userUpdateRole(userId: string, roleId: string, input: UserUpdateRoleInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!roleId) {
        throw new BadRequestException('Role Id is required')
      } else {

      const roleData = await this.checkRoleExist(input.name)

      if (roleData.length > 0) {
        if (roleData[0].id != roleId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Role', 'Update', input)

    let role = this.data.role.update({
      where: { id: roleId },
      data: {
name: input.name, 

}
, include: {roleFeaturePermissions: true, userRoles: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Role', 'Update', role)

    return role

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Role')
    }
  }

  async userUpdateRoles(userId: string, input: UserUpdateRolesInput): Promise<UpdateResult> {
    const total = input.roles.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.roles) {
      const inputData = input.roles[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const roleData = await this.checkRoleExist(inputData.name)

      if (roleData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.role.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteRole(userId: string, roleId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!roleId) {
        throw new BadRequestException('Role Id is required')
      } else {

        const roleFeaturePermissionCount = await this.data.roleFeaturePermission.count({ where: { roleId: roleId }})
        if(roleFeaturePermissionCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Role Feature Permission')
        }

        const userRoleCount = await this.data.userRole.count({ where: { roleId: roleId }})
        if(userRoleCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an User Role')
        }

        await this.data.logEvent(sendingUser, true, 'Role', 'Delete', roleId)

        let role = this.data.role.delete({
          where: { id: roleId }
        })

        await this.data.logEvent(sendingUser, false, 'Role', 'Delete', role)

        return role

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Role')
    }
  }
}

