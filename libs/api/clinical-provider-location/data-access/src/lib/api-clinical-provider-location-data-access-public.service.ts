
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClinicalProviderLocationInput } from './dto/user-list-clinical-provider-location.input'

@Injectable()
export class ApiClinicalProviderLocationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClinicalProviderLocations(input?: UserListClinicalProviderLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
locationId: input.locationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, location: true}
    })
  }

  async publicSelectClinicalProviderLocations(input?: UserListClinicalProviderLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
locationId: input.locationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClinicalProviderLocations(input?: UserListClinicalProviderLocationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderLocation.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
locationId: input.locationId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClinicalProviderLocation(clinicalProviderLocationId) {

    return this.data.clinicalProviderLocation.findUnique({ where: { id: clinicalProviderLocationId } , include: {clinicalProvider: true, location: true, clinicalProviderLocationAvailabilities: true}  })
  }
}


