
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClinicalProviderLocationInput } from './dto/admin-create-clinical-provider-location.input'
import { AdminListClinicalProviderLocationInput } from './dto/admin-list-clinical-provider-location.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListLocationInput } from '@case-clinical/api/location/data-access'
import { AdminUpdateClinicalProviderLocationInput } from './dto/admin-update-clinical-provider-location.input'

@Injectable()
export class ApiClinicalProviderLocationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClinicalProviderLocations(adminId: string, input?: AdminListClinicalProviderLocationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocation.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, location: true}
    })
  }

  async adminCountClinicalProviderLocations(adminId: string, input?: AdminListClinicalProviderLocationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderLocation.count(
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

  
  

  async adminClinicalProviderLocation(adminId: string, clinicalProviderLocationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.clinicalProviderLocation.findUnique({ where: { id: clinicalProviderLocationId } , include: {clinicalProvider: true, location: true, clinicalProviderLocationAvailabilities: true} })
  }

  async checkClinicalProviderLocationExist(clinicalProviderLocationName: string) {
    try {
      return this.data.clinicalProviderLocation.findMany({ where: { name: clinicalProviderLocationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClinicalProviderLocation(adminId: string, input: AdminCreateClinicalProviderLocationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const clinicalProviderLocationData = await this.checkClinicalProviderLocationExist(input.name)

      if (clinicalProviderLocationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.clinicalProviderLocation.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                location: 
                input.locationId != null
                ? {
                        connect:  { 
                            id: input.locationId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {clinicalProvider: true, location: true, clinicalProviderLocationAvailabilities: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClinicalProviderLocation(adminId: string, clinicalProviderLocationId, input: AdminUpdateClinicalProviderLocationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderLocation.update({
      where: { id: clinicalProviderLocationId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                location: 
                input.locationId != null
                ? {
                        connect:  { 
                            id: input.locationId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true, location: true, clinicalProviderLocationAvailabilities: true} 
    })
  }

  async adminDeleteClinicalProviderLocation(adminId: string, clinicalProviderLocationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderLocation.delete({ where: { id: clinicalProviderLocationId } })
  }
}

