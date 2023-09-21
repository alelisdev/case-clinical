
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListMedicalConditionProviderInput } from './dto/user-list-medical-condition-provider.input'

@Injectable()
export class ApiMedicalConditionProviderDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicMedicalConditionProviders(input?: UserListMedicalConditionProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalConditionProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectMedicalConditionProviders(input?: UserListMedicalConditionProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalConditionProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
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

  async publicCountMedicalConditionProviders(input?: UserListMedicalConditionProviderInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalConditionProvider.count(
    {
      where: {
            AND: [{
            name: { contains: name },
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

  async publicMedicalConditionProvider(medicalConditionProviderId) {

    return this.data.medicalConditionProvider.findUnique({ where: { id: medicalConditionProviderId } , include: {clinicalProvider: true, medicalRecords: true}  })
  }
}


