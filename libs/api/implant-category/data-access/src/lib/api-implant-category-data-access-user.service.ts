
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateImplantCategoryInput } from './dto/user-create-implant-category.input'
import { UserListImplantCategoryInput } from './dto/user-list-implant-category.input'
import { UserUpdateImplantCategoryInput } from './dto/user-update-implant-category.input'
import { UserUpdateImplantCategoriesInput } from './dto/user-update-implant-categories.input'



@Injectable()
export class ApiImplantCategoryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userImplantCategories(userId: string, input?: UserListImplantCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implantCategory.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectImplantCategories(userId: string, input?: UserListImplantCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implantCategory.findMany({
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

  async userCountImplantCategories(userId: string, input?: UserListImplantCategoryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.implantCategory.count(
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

  async userImplantCategory(userId: string, implantCategoryId) {

    return this.data.implantCategory.findUnique({ where: { id: implantCategoryId } , include: {implants: {include: {implantCategory: true, salesRepresentative: true, manufacturer: true}}}  })
  }

  async checkImplantCategoryExist(implantCategoryName: string) {
    try {
      return this.data.implantCategory.findMany({ where: { name: implantCategoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateImplantCategory(userId: string, input: UserCreateImplantCategoryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const implantCategoryData = await this.checkImplantCategoryExist(input.name)

        if (implantCategoryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ImplantCategory', 'Create', input)

    let implantCategory = await this.data.implantCategory.create({
      data: { 
name: input.name, 

}
, include: {implants: {include: {implantCategory: true, salesRepresentative: true, manufacturer: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'ImplantCategory', 'Create', implantCategory)

    return implantCategory

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Implant Category')
    }

  }


  
  

  async userUpdateImplantCategory(userId: string, implantCategoryId: string, input: UserUpdateImplantCategoryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!implantCategoryId) {
        throw new BadRequestException('Implant Category Id is required')
      } else {

      const implantCategoryData = await this.checkImplantCategoryExist(input.name)

      if (implantCategoryData.length > 0) {
        if (implantCategoryData[0].id != implantCategoryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ImplantCategory', 'Update', input)

    let implantCategory = this.data.implantCategory.update({
      where: { id: implantCategoryId },
      data: {
name: input.name, 

}
, include: {implants: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ImplantCategory', 'Update', implantCategory)

    return implantCategory

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Implant Category')
    }
  }

  async userUpdateImplantCategories(userId: string, input: UserUpdateImplantCategoriesInput): Promise<UpdateResult> {
    const total = input.implantCategories.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.implantCategories) {
      const inputData = input.implantCategories[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const implantCategoryData = await this.checkImplantCategoryExist(inputData.name)

      if (implantCategoryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.implantCategory.upsert({
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


  async userDeleteImplantCategory(userId: string, implantCategoryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!implantCategoryId) {
        throw new BadRequestException('Implant Category Id is required')
      } else {

        const implantCount = await this.data.implant.count({ where: { implantCategoryId: implantCategoryId }})
        if(implantCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Implant')
        }

        await this.data.logEvent(sendingUser, true, 'ImplantCategory', 'Delete', implantCategoryId)

        let implantCategory = this.data.implantCategory.delete({
          where: { id: implantCategoryId }
        })

        await this.data.logEvent(sendingUser, false, 'ImplantCategory', 'Delete', implantCategory)

        return implantCategory

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Implant Category')
    }
  }
}

