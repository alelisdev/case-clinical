
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClinicalProviderInput } from './dto/user-list-clinical-provider.input'

@Injectable()
export class ApiClinicalProviderDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClinicalProviders(input?: UserListClinicalProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {vendor: true}
    })
  }

  async publicSelectClinicalProviders(input?: UserListClinicalProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClinicalProviders(input?: UserListClinicalProviderInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProvider.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClinicalProvider(clinicalProviderId) {

    return this.data.clinicalProvider.findUnique({ where: { id: clinicalProviderId } , include: {vendor: true, appointments: true, clinicalProviderLocations: true, clinicalProviderSpecialties: true, clinicalProviderTags: true, favoriteProviders: true, medicalConditionProviders: true, medicalRecords: true, pchProviders: true}  })
  }
}


