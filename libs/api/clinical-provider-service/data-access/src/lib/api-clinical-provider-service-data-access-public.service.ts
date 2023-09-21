
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClinicalProviderServiceInput } from './dto/user-list-clinical-provider-service.input'

@Injectable()
export class ApiClinicalProviderServiceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClinicalProviderServices(input?: UserListClinicalProviderServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderService.findMany({
      where: {
            AND: [{
            name: { contains: name },
            serviceId: input.serviceId,
clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {service: true, clinicalProvider: true}
    })
  }

  async publicSelectClinicalProviderServices(input?: UserListClinicalProviderServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderService.findMany({
      where: {
            AND: [{
            name: { contains: name },
            serviceId: input.serviceId,
clinicalProviderId: input.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClinicalProviderServices(input?: UserListClinicalProviderServiceInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderService.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            serviceId: input.serviceId,
clinicalProviderId: input.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClinicalProviderService(clinicalProviderServiceId) {

    return this.data.clinicalProviderService.findUnique({ where: { id: clinicalProviderServiceId } , include: {service: true, clinicalProvider: true}  })
  }
}


