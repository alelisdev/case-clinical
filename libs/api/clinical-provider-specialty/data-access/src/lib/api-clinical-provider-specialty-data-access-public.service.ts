
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClinicalProviderSpecialtyInput } from './dto/user-list-clinical-provider-specialty.input'

@Injectable()
export class ApiClinicalProviderSpecialtyDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClinicalProviderSpecialties(input?: UserListClinicalProviderSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderSpecialty.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
specialtyId: input.specialtyId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, specialty: true}
    })
  }

  async publicSelectClinicalProviderSpecialties(input?: UserListClinicalProviderSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderSpecialty.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
specialtyId: input.specialtyId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClinicalProviderSpecialties(input?: UserListClinicalProviderSpecialtyInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderSpecialty.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
specialtyId: input.specialtyId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClinicalProviderSpecialty(clinicalProviderSpecialtyId) {

    return this.data.clinicalProviderSpecialty.findUnique({ where: { id: clinicalProviderSpecialtyId } , include: {clinicalProvider: true, specialty: true}  })
  }
}


