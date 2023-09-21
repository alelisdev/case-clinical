
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAuthorizationCategoryInput } from './dto/admin-create-authorization-category.input'
import { AdminListAuthorizationCategoryInput } from './dto/admin-list-authorization-category.input'

import { AdminUpdateAuthorizationCategoryInput } from './dto/admin-update-authorization-category.input'

@Injectable()
export class ApiAuthorizationCategoryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAuthorizationCategories(adminId: string, input?: AdminListAuthorizationCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.authorizationCategory.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAuthorizationCategories(adminId: string, input?: AdminListAuthorizationCategoryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationCategory.count(
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

  
  

  async adminAuthorizationCategory(adminId: string, authorizationCategoryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.authorizationCategory.findUnique({ where: { id: authorizationCategoryId } , include: {authorizations: true} })
  }

  async checkAuthorizationCategoryExist(authorizationCategoryName: string) {
    try {
      return this.data.authorizationCategory.findMany({ where: { name: authorizationCategoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAuthorizationCategory(adminId: string, input: AdminCreateAuthorizationCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const authorizationCategoryData = await this.checkAuthorizationCategoryExist(input.name)

      if (authorizationCategoryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.authorizationCategory.create({
          data: { 
    name: input.name, 

    }
    , include: {authorizations: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAuthorizationCategory(adminId: string, authorizationCategoryId, input: AdminUpdateAuthorizationCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationCategory.update({
      where: { id: authorizationCategoryId },
      data: {
name: input.name, 

}
, include: {authorizations: true} 
    })
  }

  async adminDeleteAuthorizationCategory(adminId: string, authorizationCategoryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationCategory.delete({ where: { id: authorizationCategoryId } })
  }
}

