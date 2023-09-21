
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAuthorizationTypeInput } from './dto/user-create-authorization-type.input'
import { UserListAuthorizationTypeInput } from './dto/user-list-authorization-type.input'
import { UserUpdateAuthorizationTypeInput } from './dto/user-update-authorization-type.input'
import { UserUpdateAuthorizationTypesInput } from './dto/user-update-authorization-types.input'



@Injectable()
export class ApiAuthorizationTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAuthorizationTypes(userId: string, input?: UserListAuthorizationTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAuthorizationTypes(userId: string, input?: UserListAuthorizationTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationType.findMany({
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

  async userCountAuthorizationTypes(userId: string, input?: UserListAuthorizationTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationType.count(
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

  async userAuthorizationType(userId: string, authorizationTypeId) {

    return this.data.authorizationType.findUnique({ where: { id: authorizationTypeId } , include: {authorizations: true}  })
  }

  async checkAuthorizationTypeExist(authorizationTypeName: string) {
    try {
      return this.data.authorizationType.findMany({ where: { name: authorizationTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAuthorizationType(userId: string, input: UserCreateAuthorizationTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const authorizationTypeData = await this.checkAuthorizationTypeExist(input.name)

        if (authorizationTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AuthorizationType', 'Create', input)

    let authorizationType = await this.data.authorizationType.create({
      data: { 
name: input.name, 

}
, include: {authorizations: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationType', 'Create', authorizationType)

    return authorizationType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Authorization Type')
    }

  }


  
  

  async userUpdateAuthorizationType(userId: string, authorizationTypeId: string, input: UserUpdateAuthorizationTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!authorizationTypeId) {
        throw new BadRequestException('Authorization Type Id is required')
      } else {

      const authorizationTypeData = await this.checkAuthorizationTypeExist(input.name)

      if (authorizationTypeData.length > 0) {
        if (authorizationTypeData[0].id != authorizationTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AuthorizationType', 'Update', input)

    let authorizationType = this.data.authorizationType.update({
      where: { id: authorizationTypeId },
      data: {
name: input.name, 

}
, include: {authorizations: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationType', 'Update', authorizationType)

    return authorizationType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Authorization Type')
    }
  }

  async userUpdateAuthorizationTypes(userId: string, input: UserUpdateAuthorizationTypesInput): Promise<UpdateResult> {
    const total = input.authorizationTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.authorizationTypes) {
      const inputData = input.authorizationTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const authorizationTypeData = await this.checkAuthorizationTypeExist(inputData.name)

      if (authorizationTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.authorizationType.upsert({
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


  async userDeleteAuthorizationType(userId: string, authorizationTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!authorizationTypeId) {
        throw new BadRequestException('Authorization Type Id is required')
      } else {


        const authorizationCount = await this.data.authorization.count({ where: { authorizationTypeId: authorizationTypeId }})
        if(authorizationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Authorization')
        }


        await this.data.logEvent(sendingUser, true, 'AuthorizationType', 'Delete', authorizationTypeId)

        let authorizationType = this.data.authorizationType.delete({
          where: { id: authorizationTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'AuthorizationType', 'Delete', authorizationType)

        return authorizationType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Authorization Type')
    }
  }
}

