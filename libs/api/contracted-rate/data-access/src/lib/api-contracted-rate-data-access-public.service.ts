
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContractedRateInput } from './dto/user-list-contracted-rate.input'

@Injectable()
export class ApiContractedRateDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContractedRates(input?: UserListContractedRateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
contractedRateKindId: input.contractedRateKindId,
contractKindId: input.contractKindId,
visitKindId: input.visitKindId,
clinicalProviderId: input.clinicalProviderId,
specialtyId: input.specialtyId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true}
    })
  }

  async publicSelectContractedRates(input?: UserListContractedRateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
contractedRateKindId: input.contractedRateKindId,
contractKindId: input.contractKindId,
visitKindId: input.visitKindId,
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

  async publicCountContractedRates(input?: UserListContractedRateInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contractedRate.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
contractedRateKindId: input.contractedRateKindId,
contractKindId: input.contractKindId,
visitKindId: input.visitKindId,
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

  async publicContractedRate(contractedRateId) {

    return this.data.contractedRate.findUnique({ where: { id: contractedRateId } , include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true}  })
  }
}


