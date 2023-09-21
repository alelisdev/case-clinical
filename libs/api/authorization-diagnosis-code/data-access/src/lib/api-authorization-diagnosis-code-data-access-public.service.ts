
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAuthorizationDiagnosisCodeInput } from './dto/user-list-authorization-diagnosis-code.input'

@Injectable()
export class ApiAuthorizationDiagnosisCodeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAuthorizationDiagnosisCodes(input?: UserListAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
authorizationId: input.authorizationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, authorization: true}
    })
  }

  async publicSelectAuthorizationDiagnosisCodes(input?: UserListAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
authorizationId: input.authorizationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountAuthorizationDiagnosisCodes(input?: UserListAuthorizationDiagnosisCodeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
authorizationId: input.authorizationId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicAuthorizationDiagnosisCode(authorizationDiagnosisCodeId) {

    return this.data.authorizationDiagnosisCode.findUnique({ where: { id: authorizationDiagnosisCodeId } , include: {diagnosis: true, authorization: true}  })
  }
}


