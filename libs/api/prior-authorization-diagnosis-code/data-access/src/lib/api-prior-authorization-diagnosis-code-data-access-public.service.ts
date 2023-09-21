
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorAuthorizationDiagnosisCodeInput } from './dto/user-list-prior-authorization-diagnosis-code.input'

@Injectable()
export class ApiPriorAuthorizationDiagnosisCodeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorAuthorizationDiagnosisCodes(input?: UserListPriorAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, priorAuthorizationRequest: true}
    })
  }

  async publicSelectPriorAuthorizationDiagnosisCodes(input?: UserListPriorAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPriorAuthorizationDiagnosisCodes(input?: UserListPriorAuthorizationDiagnosisCodeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPriorAuthorizationDiagnosisCode(priorAuthorizationDiagnosisCodeId) {

    return this.data.priorAuthorizationDiagnosisCode.findUnique({ where: { id: priorAuthorizationDiagnosisCodeId } , include: {diagnosis: true, priorAuthorizationRequest: true}  })
  }
}


