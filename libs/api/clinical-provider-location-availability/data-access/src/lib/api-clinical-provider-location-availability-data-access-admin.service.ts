
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClinicalProviderLocationAvailabilityInput } from './dto/admin-create-clinical-provider-location-availability.input'
import { AdminListClinicalProviderLocationAvailabilityInput } from './dto/admin-list-clinical-provider-location-availability.input'
import { AdminListClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access'
import { AdminUpdateClinicalProviderLocationAvailabilityInput } from './dto/admin-update-clinical-provider-location-availability.input'

@Injectable()
export class ApiClinicalProviderLocationAvailabilityDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClinicalProviderLocationAvailabilities(adminId: string, input?: AdminListClinicalProviderLocationAvailabilityInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocationAvailability.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProviderLocation: true}
    })
  }

  async adminCountClinicalProviderLocationAvailabilities(adminId: string, input?: AdminListClinicalProviderLocationAvailabilityInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderLocationAvailability.count(
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

  
  

  async adminClinicalProviderLocationAvailability(adminId: string, clinicalProviderLocationAvailabilityId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.clinicalProviderLocationAvailability.findUnique({ where: { id: clinicalProviderLocationAvailabilityId } , include: {clinicalProviderLocation: true} })
  }

  async checkClinicalProviderLocationAvailabilityExist(clinicalProviderLocationAvailabilityName: string) {
    try {
      return this.data.clinicalProviderLocationAvailability.findMany({ where: { name: clinicalProviderLocationAvailabilityName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClinicalProviderLocationAvailability(adminId: string, input: AdminCreateClinicalProviderLocationAvailabilityInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const clinicalProviderLocationAvailabilityData = await this.checkClinicalProviderLocationAvailabilityExist(input.name)

      if (clinicalProviderLocationAvailabilityData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.clinicalProviderLocationAvailability.create({
          data: { 
      
                clinicalProviderLocation: 
                input.clinicalProviderLocationId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderLocationId
                        }
                    }: undefined,name: input.name, 
day: input.day, 
startTime: input.startTime, 
endTime: input.endTime, 

    }
    , include: {clinicalProviderLocation: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClinicalProviderLocationAvailability(adminId: string, clinicalProviderLocationAvailabilityId, input: AdminUpdateClinicalProviderLocationAvailabilityInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderLocationAvailability.update({
      where: { id: clinicalProviderLocationAvailabilityId },
      data: {
  
                clinicalProviderLocation: 
                input.clinicalProviderLocationId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderLocationId
                        }
                    }: undefined,name: input.name, 
day: input.day, 
startTime: input.startTime, 
endTime: input.endTime, 

}
, include: {clinicalProviderLocation: true} 
    })
  }

  async adminDeleteClinicalProviderLocationAvailability(adminId: string, clinicalProviderLocationAvailabilityId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderLocationAvailability.delete({ where: { id: clinicalProviderLocationAvailabilityId } })
  }
}

