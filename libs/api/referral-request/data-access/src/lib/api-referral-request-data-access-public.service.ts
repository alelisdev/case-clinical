
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListReferralRequestInput } from './dto/user-list-referral-request.input'

@Injectable()
export class ApiReferralRequestDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicReferralRequests(input?: UserListReferralRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.referralRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,
requestingProviderId: input.requestingProviderId,
referredToId: input.referredToId,
clinicalProviderLocationId: input.clinicalProviderLocationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true}
    })
  }

  async publicSelectReferralRequests(input?: UserListReferralRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.referralRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,
requestingProviderId: input.requestingProviderId,
referredToId: input.referredToId,
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

  async publicCountReferralRequests(input?: UserListReferralRequestInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.referralRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,
requestingProviderId: input.requestingProviderId,
referredToId: input.referredToId,
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

  async publicReferralRequest(referralRequestId) {

    return this.data.referralRequest.findUnique({ where: { id: referralRequestId } , include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true}  })
  }
}


