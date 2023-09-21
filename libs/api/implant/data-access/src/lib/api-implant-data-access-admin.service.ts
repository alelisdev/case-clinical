
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateImplantInput } from './dto/admin-create-implant.input'
import { AdminListImplantInput } from './dto/admin-list-implant.input'
import { AdminListImplantCategoryInput } from '@case-clinical/api/implant-category/data-access'
import { AdminListContactInput } from '@case-clinical/api/contact/data-access'
import { AdminListManufacturerInput } from '@case-clinical/api/manufacturer/data-access'
import { AdminUpdateImplantInput } from './dto/admin-update-implant.input'

@Injectable()
export class ApiImplantDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminImplants(adminId: string, input?: AdminListImplantInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.implant.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {implantCategory: true, salesRepresentative: true, manufacturer: true}
    })
  }

  async adminCountImplants(adminId: string, input?: AdminListImplantInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.implant.count(
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

  
  

  async adminImplant(adminId: string, implantId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.implant.findUnique({ where: { id: implantId } , include: {implantCategory: true, salesRepresentative: true, manufacturer: true, priorAuthorizationImplants: true} })
  }

  async checkImplantExist(implantName: string) {
    try {
      return this.data.implant.findMany({ where: { name: implantName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateImplant(adminId: string, input: AdminCreateImplantInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const implantData = await this.checkImplantExist(input.name)

      if (implantData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.implant.create({
          data: { 
      
                implantCategory: 
                input.implantCategoryId != null
                ? {
                        connect:  { 
                            id: input.implantCategoryId
                        }
                    }: undefined,  
                salesRepresentative: 
                input.salesRepresentativeId != null
                ? {
                        connect:  { 
                            id: input.salesRepresentativeId
                        }
                    }: undefined,  
                manufacturer: 
                input.manufacturerId != null
                ? {
                        connect:  { 
                            id: input.manufacturerId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 
photoUrl: input.photoUrl, 
sku: input.sku, 

    }
    , include: {implantCategory: true, salesRepresentative: true, manufacturer: true, priorAuthorizationImplants: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateImplant(adminId: string, implantId, input: AdminUpdateImplantInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.implant.update({
      where: { id: implantId },
      data: {
  
                implantCategory: 
                input.implantCategoryId != null
                ? {
                        connect:  { 
                            id: input.implantCategoryId
                        }
                    }: undefined,  
                salesRepresentative: 
                input.salesRepresentativeId != null
                ? {
                        connect:  { 
                            id: input.salesRepresentativeId
                        }
                    }: undefined,  
                manufacturer: 
                input.manufacturerId != null
                ? {
                        connect:  { 
                            id: input.manufacturerId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 
photoUrl: input.photoUrl, 
sku: input.sku, 

}
, include: {implantCategory: true, salesRepresentative: true, manufacturer: true, priorAuthorizationImplants: true} 
    })
  }

  async adminDeleteImplant(adminId: string, implantId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.implant.delete({ where: { id: implantId } })
  }
}

