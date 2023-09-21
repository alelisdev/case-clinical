
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRoleFeaturePermissionInput } from './dto/user-create-role-feature-permission.input'
import { UserListRoleFeaturePermissionInput } from './dto/user-list-role-feature-permission.input'
import { UserUpdateRoleFeaturePermissionInput } from './dto/user-update-role-feature-permission.input'
import { UserUpdateRoleFeaturePermissionsInput } from './dto/user-update-role-feature-permissions.input'

import { UserListFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access'
import { UserListRoleInput } from '@case-clinical/api/role/data-access'

@Injectable()
export class ApiRoleFeaturePermissionDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRoleFeaturePermissions(userId: string, input?: UserListRoleFeaturePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.roleFeaturePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
            featurePermissionId: input?.featurePermissionId,
roleId: input?.roleId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {featurePermission: true, role: true}
    })
  }

  async userSelectRoleFeaturePermissions(userId: string, input?: UserListRoleFeaturePermissionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.roleFeaturePermission.findMany({
      where: {
            AND: [{
            name: { contains: name },
            featurePermissionId: input?.featurePermissionId,
roleId: input?.roleId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountRoleFeaturePermissions(userId: string, input?: UserListRoleFeaturePermissionInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.roleFeaturePermission.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            featurePermissionId: input?.featurePermissionId,
roleId: input?.roleId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userRoleFeaturePermission(userId: string, roleFeaturePermissionId) {

    return this.data.roleFeaturePermission.findUnique({ where: { id: roleFeaturePermissionId } , include: {featurePermission: true, role: true}  })
  }

  async checkRoleFeaturePermissionExist(roleFeaturePermissionName: string) {
    try {
      return this.data.roleFeaturePermission.findMany({ where: { name: roleFeaturePermissionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRoleFeaturePermission(userId: string, input: UserCreateRoleFeaturePermissionInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const roleFeaturePermissionData = await this.checkRoleFeaturePermissionExist(input.name)

        if (roleFeaturePermissionData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'RoleFeaturePermission', 'Create', input)

    let roleFeaturePermission = await this.data.roleFeaturePermission.create({
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

    await this.data.logEvent(sendingUser, false, 'RoleFeaturePermission', 'Create', roleFeaturePermission)

    return roleFeaturePermission

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Role Feature Permission')
    }

  }


  
  

  async userUpdateRoleFeaturePermission(userId: string, roleFeaturePermissionId: string, input: UserUpdateRoleFeaturePermissionInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!roleFeaturePermissionId) {
        throw new BadRequestException('Role Feature Permission Id is required')
      } else {

      const roleFeaturePermissionData = await this.checkRoleFeaturePermissionExist(input.name)

      if (roleFeaturePermissionData.length > 0) {
        if (roleFeaturePermissionData[0].id != roleFeaturePermissionId) {
          throw new ConflictException("Same Role Feature Permission exists already.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'RoleFeaturePermission', 'Update', input)

    let roleFeaturePermission = this.data.roleFeaturePermission.update({
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

    await this.data.logEvent(sendingUser, false, 'RoleFeaturePermission', 'Update', roleFeaturePermission)

    return roleFeaturePermission

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Role Feature Permission')
    }
  }

  async userUpdateRoleFeaturePermissions(userId: string, input: UserUpdateRoleFeaturePermissionsInput): Promise<UpdateResult> {
    const total = input.roleFeaturePermissions.length;
    let updated = [];
    let created = [];
    let failed = [];

    for(const key in input.roleFeaturePermissions) {
        const inputData = input.roleFeaturePermissions[key]

        const data =  {
            id: inputData.id, 
name: inputData.name, 
featurePermissionId: inputData.featurePermissionId, 
roleId: inputData.roleId, 

        }

        try {
            const result = await this.data.roleFeaturePermission.upsert({
            where: {id: inputData.id || ""},
              create: data,
              update: data
            })
              
            if(result.id === inputData.id)
              updated.push(result);
            else {
              created.push(result);
            }
          } catch (error) {
              failed.push(inputData);
          }
        }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed)
    }
  }


  async userDeleteRoleFeaturePermission(userId: string, roleFeaturePermissionId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!roleFeaturePermissionId) {
        throw new BadRequestException('Role Feature Permission Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'RoleFeaturePermission', 'Delete', roleFeaturePermissionId)

        let roleFeaturePermission = this.data.roleFeaturePermission.delete({
          where: { id: roleFeaturePermissionId }
        })

        await this.data.logEvent(sendingUser, false, 'RoleFeaturePermission', 'Delete', roleFeaturePermission)

        return roleFeaturePermission

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Role Feature Permission')
    }
  }
}

