
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAuthorizationCategoryInput } from './dto/user-create-authorization-category.input'
import { UserListAuthorizationCategoryInput } from './dto/user-list-authorization-category.input'
import { UserUpdateAuthorizationCategoryInput } from './dto/user-update-authorization-category.input'
import { UserUpdateAuthorizationCategoriesInput } from './dto/user-update-authorization-categories.input'



@Injectable()
export class ApiAuthorizationCategoryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAuthorizationCategories(userId: string, input?: UserListAuthorizationCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationCategory.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAuthorizationCategories(userId: string, input?: UserListAuthorizationCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationCategory.findMany({
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

  async userCountAuthorizationCategories(userId: string, input?: UserListAuthorizationCategoryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationCategory.count(
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

  async userAuthorizationCategory(userId: string, authorizationCategoryId) {

    return this.data.authorizationCategory.findUnique({ where: { id: authorizationCategoryId } , include: {authorizations: true}  })
  }

  async checkAuthorizationCategoryExist(authorizationCategoryName: string) {
    try {
      return this.data.authorizationCategory.findMany({ where: { name: authorizationCategoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAuthorizationCategory(userId: string, input: UserCreateAuthorizationCategoryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const authorizationCategoryData = await this.checkAuthorizationCategoryExist(input.name)

        if (authorizationCategoryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AuthorizationCategory', 'Create', input)

    let authorizationCategory = await this.data.authorizationCategory.create({
      data: { 
name: input.name, 

}
, include: {authorizations: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationCategory', 'Create', authorizationCategory)

    return authorizationCategory

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Authorization Category')
    }

  }


  
  

  async userUpdateAuthorizationCategory(userId: string, authorizationCategoryId: string, input: UserUpdateAuthorizationCategoryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!authorizationCategoryId) {
        throw new BadRequestException('Authorization Category Id is required')
      } else {

      const authorizationCategoryData = await this.checkAuthorizationCategoryExist(input.name)

      if (authorizationCategoryData.length > 0) {
        if (authorizationCategoryData[0].id != authorizationCategoryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AuthorizationCategory', 'Update', input)

    let authorizationCategory = this.data.authorizationCategory.update({
      where: { id: authorizationCategoryId },
      data: {
name: input.name, 

}
, include: {authorizations: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationCategory', 'Update', authorizationCategory)

    return authorizationCategory

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Authorization Category')
    }
  }

  async userUpdateAuthorizationCategories(userId: string, input: UserUpdateAuthorizationCategoriesInput): Promise<UpdateResult> {
    const total = input.authorizationCategories.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.authorizationCategories) {
      const inputData = input.authorizationCategories[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const authorizationCategoryData = await this.checkAuthorizationCategoryExist(inputData.name)

      if (authorizationCategoryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.authorizationCategory.upsert({
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


  async userDeleteAuthorizationCategory(userId: string, authorizationCategoryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!authorizationCategoryId) {
        throw new BadRequestException('Authorization Category Id is required')
      } else {


        const authorizationCount = await this.data.authorization.count({ where: { authorizationCategoryId: authorizationCategoryId }})
        if(authorizationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Authorization')
        }


        await this.data.logEvent(sendingUser, true, 'AuthorizationCategory', 'Delete', authorizationCategoryId)

        let authorizationCategory = this.data.authorizationCategory.delete({
          where: { id: authorizationCategoryId }
        })

        await this.data.logEvent(sendingUser, false, 'AuthorizationCategory', 'Delete', authorizationCategory)

        return authorizationCategory

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Authorization Category')
    }
  }
}

