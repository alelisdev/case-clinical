
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateImplantCategoryInput } from './dto/admin-create-implant-category.input'
import { AdminListImplantCategoryInput } from './dto/admin-list-implant-category.input'

import { AdminUpdateImplantCategoryInput } from './dto/admin-update-implant-category.input'

@Injectable()
export class ApiImplantCategoryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminImplantCategories(adminId: string, input?: AdminListImplantCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.implantCategory.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountImplantCategories(adminId: string, input?: AdminListImplantCategoryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.implantCategory.count(
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

  
  

  async adminImplantCategory(adminId: string, implantCategoryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.implantCategory.findUnique({ where: { id: implantCategoryId } , include: {implants: true} })
  }

  async checkImplantCategoryExist(implantCategoryName: string) {
    try {
      return this.data.implantCategory.findMany({ where: { name: implantCategoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateImplantCategory(adminId: string, input: AdminCreateImplantCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const implantCategoryData = await this.checkImplantCategoryExist(input.name)

      if (implantCategoryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.implantCategory.create({
          data: { 
    name: input.name, 

    }
    , include: {implants: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateImplantCategory(adminId: string, implantCategoryId, input: AdminUpdateImplantCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.implantCategory.update({
      where: { id: implantCategoryId },
      data: {
name: input.name, 

}
, include: {implants: true} 
    })
  }

  async adminDeleteImplantCategory(adminId: string, implantCategoryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.implantCategory.delete({ where: { id: implantCategoryId } })
  }
}

