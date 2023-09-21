
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRolePermissionInput } from './dto/user-create-role-permission.input'
import { UserListRolePermissionInput } from './dto/user-list-role-permission.input'
import { UserUpdateRolePermissionInput } from './dto/user-update-role-permission.input'
import { UserUpdateRolePermissionsInput } from './dto/user-update-role-permissions.input'

import { UserListPermissionInput } from '@case-clinical/api/permission/data-access'

@Injectable()
export class ApiRolePermissionDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRolePermissions(userId: string, input?: UserListRolePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.rolePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
            permissionId: input.permissionId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {permission: true}
    })
  }

  async userSelectRolePermissions(userId: string, input?: UserListRolePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.rolePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
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

  async userCountRolePermissions(userId: string, input?: UserListRolePermissionInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.rolePermission.count(
    {
      where: {
            AND: [{
            name: { contains: name },
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

  async userRolePermission(userId: string, rolePermissionId) {

    return this.data.rolePermission.findUnique({ where: { id: rolePermissionId } , include: {permission: true}  })
  }

  async checkRolePermissionExist(rolePermissionName: string) {
    try {
      return this.data.rolePermission.findMany({ where: { name: rolePermissionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRolePermission(userId: string, input: UserCreateRolePermissionInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const rolePermissionData = await this.checkRolePermissionExist(input.name)

        if (rolePermissionData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'RolePermission', 'Create', input)

    let rolePermission = await this.data.rolePermission.create({
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

    await this.data.logEvent(sendingUser, false, 'RolePermission', 'Create', rolePermission)

    return rolePermission

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Role Permission')
    }

  }


  
  

  async userUpdateRolePermission(userId: string, rolePermissionId: string, input: UserUpdateRolePermissionInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!rolePermissionId) {
        throw new BadRequestException('Role Permission Id is required')
      } else {

      const rolePermissionData = await this.checkRolePermissionExist(input.name)

      if (rolePermissionData.length > 0) {
        if (rolePermissionData[0].id != rolePermissionId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'RolePermission', 'Update', input)

    let rolePermission = this.data.rolePermission.update({
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

    await this.data.logEvent(sendingUser, false, 'RolePermission', 'Update', rolePermission)

    return rolePermission

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Role Permission')
    }
  }

  async userUpdateRolePermissions(userId: string, input: UserUpdateRolePermissionsInput): Promise<UpdateResult> {
    const total = input.rolePermissions.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.rolePermissions) {
      const inputData = input.rolePermissions[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
roleId: inputData.roleId, 
permissionId: inputData.permissionId, 

      }

      const rolePermissionData = await this.checkRolePermissionExist(inputData.name)

      if (rolePermissionData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.rolePermission.upsert({
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


  async userDeleteRolePermission(userId: string, rolePermissionId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!rolePermissionId) {
        throw new BadRequestException('Role Permission Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'RolePermission', 'Delete', rolePermissionId)

        let rolePermission = this.data.rolePermission.delete({
          where: { id: rolePermissionId }
        })

        await this.data.logEvent(sendingUser, false, 'RolePermission', 'Delete', rolePermission)

        return rolePermission

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Role Permission')
    }
  }
}

