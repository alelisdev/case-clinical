
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCategoryInput } from './dto/admin-create-category.input'
import { AdminListCategoryInput } from './dto/admin-list-category.input'

import { AdminUpdateCategoryInput } from './dto/admin-update-category.input'

@Injectable()
export class ApiCategoryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCategories(adminId: string, input?: AdminListCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.category.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountCategories(adminId: string, input?: AdminListCategoryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.category.count(
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

  
  

  async adminCategory(adminId: string, categoryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.category.findUnique({ where: { id: categoryId } , include: {authorizationKinds: true} })
  }

  async checkCategoryExist(categoryName: string) {
    try {
      return this.data.category.findMany({ where: { name: categoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCategory(adminId: string, input: AdminCreateCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const categoryData = await this.checkCategoryExist(input.name)

      if (categoryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.category.create({
          data: { 
    name: input.name, 

    }
    , include: {authorizationKinds: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCategory(adminId: string, categoryId, input: AdminUpdateCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.category.update({
      where: { id: categoryId },
      data: {
name: input.name, 

}
, include: {authorizationKinds: true} 
    })
  }

  async adminDeleteCategory(adminId: string, categoryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.category.delete({ where: { id: categoryId } })
  }
}

