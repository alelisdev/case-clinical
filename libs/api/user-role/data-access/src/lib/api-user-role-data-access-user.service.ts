
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateUserRoleInput } from './dto/user-create-user-role.input'
import { UserListUserRoleInput } from './dto/user-list-user-role.input'
import { UserUpdateUserRoleInput } from './dto/user-update-user-role.input'
import { UserUpdateUserRolesInput } from './dto/user-update-user-roles.input'

import { UserListRoleInput } from '@case-clinical/api/role/data-access'
import { UserListUserInput } from '@case-clinical/api/user/data-access'

@Injectable()
export class ApiUserRoleDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userUserRoles(userId: string, input?: UserListUserRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.userRole.findMany({
      where: {
            AND: [{
            name: { contains: name },
            roleId: input?.roleId ? input.roleId : undefined,
userId:  input?.userId ? input.userId : undefined,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {role: true, user: true}
    })
  }

  async userSelectUserRoles(userId: string, input?: UserListUserRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.userRole.findMany({
      where: {
            AND: [{
            name: { contains: name },
            roleId: input?.roleId ? input.roleId : undefined,
userId: input?.userId ? input.userId : undefined,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountUserRoles(userId: string, input?: UserListUserRoleInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.userRole.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            roleId: input?.roleId ? input.roleId : undefined,
userId: input?.userId ? input.userId : undefined,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUserRole(userId: string, userRoleId) {

    return this.data.userRole.findUnique({ where: { id: userRoleId } , include: {role: true, user: true}  })
  }

  async checkUserRoleExist(userRoleName: string) {
    try {
      return this.data.userRole.findMany({ where: { name: userRoleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateUserRole(userId: string, input: UserCreateUserRoleInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const userRoleData = await this.checkUserRoleExist(input.name)

        if (userRoleData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'UserRole', 'Create', input)

    let userRole = await this.data.userRole.create({
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

    await this.data.logEvent(sendingUser, false, 'UserRole', 'Create', userRole)

    return userRole

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating User Role')
    }

  }


  
  

  async userUpdateUserRole(userId: string, userRoleId: string, input: UserUpdateUserRoleInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!userRoleId) {
        throw new BadRequestException('User Role Id is required')
      } else {

      const userRoleData = await this.checkUserRoleExist(input.name)

      if (userRoleData.length > 0) {
        if (userRoleData[0].id != userRoleId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'UserRole', 'Update', input)

    let userRole = this.data.userRole.update({
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

    await this.data.logEvent(sendingUser, false, 'UserRole', 'Update', userRole)

    return userRole

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating User Role')
    }
  }

  async userUpdateUserRoles(userId: string, input: UserUpdateUserRolesInput): Promise<UpdateResult> {
    const total = input.userRoles.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.userRoles) {
      const inputData = input.userRoles[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
roleId: inputData.roleId, 
userId: inputData.userId, 

      }

      const userRoleData = await this.checkUserRoleExist(inputData.name)

      if (userRoleData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.userRole.upsert({
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


  async userDeleteUserRole(userId: string, userRoleId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!userRoleId) {
        throw new BadRequestException('User Role Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'UserRole', 'Delete', userRoleId)

        let userRole = this.data.userRole.delete({
          where: { id: userRoleId }
        })

        await this.data.logEvent(sendingUser, false, 'UserRole', 'Delete', userRole)

        return userRole

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting User Role')
    }
  }
}

