
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePlaceOfServiceInput } from './dto/admin-create-place-of-service.input'
import { AdminListPlaceOfServiceInput } from './dto/admin-list-place-of-service.input'

import { AdminUpdatePlaceOfServiceInput } from './dto/admin-update-place-of-service.input'

@Injectable()
export class ApiPlaceOfServiceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPlaceOfServices(adminId: string, input?: AdminListPlaceOfServiceInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.placeOfService.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPlaceOfServices(adminId: string, input?: AdminListPlaceOfServiceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.placeOfService.count(
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

  
  

  async adminPlaceOfService(adminId: string, placeOfServiceId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.placeOfService.findUnique({ where: { id: placeOfServiceId } , include: {claimProcedures: true, locations: true} })
  }

  async checkPlaceOfServiceExist(placeOfServiceName: string) {
    try {
      return this.data.placeOfService.findMany({ where: { name: placeOfServiceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePlaceOfService(adminId: string, input: AdminCreatePlaceOfServiceInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const placeOfServiceData = await this.checkPlaceOfServiceExist(input.name)

      if (placeOfServiceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.placeOfService.create({
          data: { 
    name: input.name, 
isFacility: input.isFacility, 

    }
    , include: {claimProcedures: true, locations: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePlaceOfService(adminId: string, placeOfServiceId, input: AdminUpdatePlaceOfServiceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.placeOfService.update({
      where: { id: placeOfServiceId },
      data: {
name: input.name, 
isFacility: input.isFacility, 

}
, include: {claimProcedures: true, locations: true} 
    })
  }

  async adminDeletePlaceOfService(adminId: string, placeOfServiceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.placeOfService.delete({ where: { id: placeOfServiceId } })
  }
}

