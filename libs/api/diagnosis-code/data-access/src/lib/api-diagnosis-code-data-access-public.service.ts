
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListDiagnosisCodeInput } from './dto/user-list-diagnosis-code.input'

@Injectable()
export class ApiDiagnosisCodeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicDiagnosisCodes(input?: UserListDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.diagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectDiagnosisCodes(input?: UserListDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.diagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountDiagnosisCodes(input?: UserListDiagnosisCodeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.diagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicDiagnosisCode(diagnosisCodeId) {

    return this.data.diagnosisCode.findUnique({ where: { id: diagnosisCodeId } , include: {authorizationDiagnosisCodes: true, priorAuthorizationDiagnosisCodes: true, procedureOrTreatmentRequestDiagnosisCodes: true, recommendedOrderDiagnosisCodes: true}  })
  }
}


