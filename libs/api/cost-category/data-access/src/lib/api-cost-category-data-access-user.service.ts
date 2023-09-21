
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCostCategoryInput } from './dto/user-create-cost-category.input'
import { UserListCostCategoryInput } from './dto/user-list-cost-category.input'
import { UserUpdateCostCategoryInput } from './dto/user-update-cost-category.input'
import { UserUpdateCostCategoriesInput } from './dto/user-update-cost-categories.input'



@Injectable()
export class ApiCostCategoryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCostCategories(userId: string, input?: UserListCostCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.costCategory.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectCostCategories(userId: string, input?: UserListCostCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.costCategory.findMany({
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

  async userCountCostCategories(userId: string, input?: UserListCostCategoryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.costCategory.count(
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

  async userCostCategory(userId: string, costCategoryId) {

    return this.data.costCategory.findUnique({ where: { id: costCategoryId } , include: {priorAuthorizationProcedureCodes: {include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}}}  })
  }

  async checkCostCategoryExist(costCategoryName: string) {
    try {
      return this.data.costCategory.findMany({ where: { name: costCategoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCostCategory(userId: string, input: UserCreateCostCategoryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const costCategoryData = await this.checkCostCategoryExist(input.name)

        if (costCategoryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CostCategory', 'Create', input)

    let costCategory = await this.data.costCategory.create({
      data: { 
name: input.name, 

}
, include: {priorAuthorizationProcedureCodes: {include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'CostCategory', 'Create', costCategory)

    return costCategory

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Cost Category')
    }

  }


  
  

  async userUpdateCostCategory(userId: string, costCategoryId: string, input: UserUpdateCostCategoryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!costCategoryId) {
        throw new BadRequestException('Cost Category Id is required')
      } else {

      const costCategoryData = await this.checkCostCategoryExist(input.name)

      if (costCategoryData.length > 0) {
        if (costCategoryData[0].id != costCategoryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CostCategory', 'Update', input)

    let costCategory = this.data.costCategory.update({
      where: { id: costCategoryId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationProcedureCodes: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CostCategory', 'Update', costCategory)

    return costCategory

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Cost Category')
    }
  }

  async userUpdateCostCategories(userId: string, input: UserUpdateCostCategoriesInput): Promise<UpdateResult> {
    const total = input.costCategories.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.costCategories) {
      const inputData = input.costCategories[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const costCategoryData = await this.checkCostCategoryExist(inputData.name)

      if (costCategoryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.costCategory.upsert({
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


  async userDeleteCostCategory(userId: string, costCategoryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!costCategoryId) {
        throw new BadRequestException('Cost Category Id is required')
      } else {

        const priorAuthorizationProcedureCodeCount = await this.data.priorAuthorizationProcedureCode.count({ where: { costCategoryId: costCategoryId }})
        if(priorAuthorizationProcedureCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Procedure Code')
        }

        await this.data.logEvent(sendingUser, true, 'CostCategory', 'Delete', costCategoryId)

        let costCategory = this.data.costCategory.delete({
          where: { id: costCategoryId }
        })

        await this.data.logEvent(sendingUser, false, 'CostCategory', 'Delete', costCategory)

        return costCategory

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Cost Category')
    }
  }
}

