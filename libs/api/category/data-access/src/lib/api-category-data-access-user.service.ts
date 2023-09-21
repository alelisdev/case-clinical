
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCategoryInput } from './dto/user-create-category.input'
import { UserListCategoryInput } from './dto/user-list-category.input'
import { UserUpdateCategoryInput } from './dto/user-update-category.input'
import { UserUpdateCategoriesInput } from './dto/user-update-categories.input'



@Injectable()
export class ApiCategoryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCategories(userId: string, input?: UserListCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.category.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectCategories(userId: string, input?: UserListCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.category.findMany({
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

  async userCountCategories(userId: string, input?: UserListCategoryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.category.count(
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

  async userCategory(userId: string, categoryId) {

    return this.data.category.findUnique({ where: { id: categoryId } , include: {authorizationKinds: {include: { category: true },}}  })
  }

  async checkCategoryExist(categoryName: string) {
    try {
      return this.data.category.findMany({ where: { name: categoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCategory(userId: string, input: UserCreateCategoryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const categoryData = await this.checkCategoryExist(input.name)

        if (categoryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Category', 'Create', input)

    let category = await this.data.category.create({
      data: { 
name: input.name, 

}
, include: {authorizationKinds: {include: { category: true },}} 
    })

    await this.data.logEvent(sendingUser, false, 'Category', 'Create', category)

    return category

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Category')
    }

  }


  
  

  async userUpdateCategory(userId: string, categoryId: string, input: UserUpdateCategoryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!categoryId) {
        throw new BadRequestException('Category Id is required')
      } else {

      const categoryData = await this.checkCategoryExist(input.name)

      if (categoryData.length > 0) {
        if (categoryData[0].id != categoryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Category', 'Update', input)

    let category = this.data.category.update({
      where: { id: categoryId },
      data: {
name: input.name, 

}
, include: {authorizationKinds: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Category', 'Update', category)

    return category

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Category')
    }
  }

  async userUpdateCategories(userId: string, input: UserUpdateCategoriesInput): Promise<UpdateResult> {
    const total = input.categories.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.categories) {
      const inputData = input.categories[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const categoryData = await this.checkCategoryExist(inputData.name)

      if (categoryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.category.upsert({
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


  async userDeleteCategory(userId: string, categoryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!categoryId) {
        throw new BadRequestException('Category Id is required')
      } else {

        const authorizationKindCount = await this.data.authorizationKind.count({ where: { categoryId: categoryId }})
        if(authorizationKindCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Authorization Kind')
        }

        await this.data.logEvent(sendingUser, true, 'Category', 'Delete', categoryId)

        let category = this.data.category.delete({
          where: { id: categoryId }
        })

        await this.data.logEvent(sendingUser, false, 'Category', 'Delete', category)

        return category

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Category')
    }
  }
}

