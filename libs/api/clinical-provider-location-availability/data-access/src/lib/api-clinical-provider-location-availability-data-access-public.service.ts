
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClinicalProviderLocationAvailabilityInput } from './dto/user-list-clinical-provider-location-availability.input'

@Injectable()
export class ApiClinicalProviderLocationAvailabilityDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClinicalProviderLocationAvailabilities(input?: UserListClinicalProviderLocationAvailabilityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocationAvailability.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderLocationId: input.clinicalProviderLocationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProviderLocation: true}
    })
  }

  async publicSelectClinicalProviderLocationAvailabilities(input?: UserListClinicalProviderLocationAvailabilityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocationAvailability.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderLocationId: input.clinicalProviderLocationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClinicalProviderLocationAvailabilities(input?: UserListClinicalProviderLocationAvailabilityInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderLocationAvailability.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderLocationId: input.clinicalProviderLocationId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClinicalProviderLocationAvailability(clinicalProviderLocationAvailabilityId) {

    return this.data.clinicalProviderLocationAvailability.findUnique({ where: { id: clinicalProviderLocationAvailabilityId } , include: {clinicalProviderLocation: true}  })
  }
}


