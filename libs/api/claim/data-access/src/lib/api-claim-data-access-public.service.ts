
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClaimInput } from './dto/user-list-claim.input'

@Injectable()
export class ApiClaimDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClaims(input?: UserListClaimInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claim.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthorizationRequestId: input.priorAuthorizationRequestId,
claimId: input.claimId,
explanationOfPaymentId: input.explanationOfPaymentId,
patientId: input.patientId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true}
    })
  }

  async publicSelectClaims(input?: UserListClaimInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claim.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthorizationRequestId: input.priorAuthorizationRequestId,
claimId: input.claimId,
explanationOfPaymentId: input.explanationOfPaymentId,
patientId: input.patientId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClaims(input?: UserListClaimInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.claim.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            priorAuthorizationRequestId: input.priorAuthorizationRequestId,
claimId: input.claimId,
explanationOfPaymentId: input.explanationOfPaymentId,
patientId: input.patientId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClaim(claimId) {

    return this.data.claim.findUnique({ where: { id: claimId } , include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true, procedures: true}  })
  }
}


