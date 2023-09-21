
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAgreementTypeInput } from './dto/user-list-agreement-type.input'

@Injectable()
export class ApiAgreementTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAgreementTypes(input?: UserListAgreementTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.agreementType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAgreementTypes(input?: UserListAgreementTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.agreementType.findMany({
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

  async publicCountAgreementTypes(input?: UserListAgreementTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.agreementType.count(
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

  async publicAgreementType(agreementTypeId) {

    return this.data.agreementType.findUnique({ where: { id: agreementTypeId } , include: {caseAccounts: true}  })
  }
}


