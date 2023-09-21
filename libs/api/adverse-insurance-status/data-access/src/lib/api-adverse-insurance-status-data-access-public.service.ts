
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAdverseInsuranceStatusInput } from './dto/user-list-adverse-insurance-status.input'

@Injectable()
export class ApiAdverseInsuranceStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAdverseInsuranceStatuses(input?: UserListAdverseInsuranceStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.adverseInsuranceStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAdverseInsuranceStatuses(input?: UserListAdverseInsuranceStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.adverseInsuranceStatus.findMany({
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

  async publicCountAdverseInsuranceStatuses(input?: UserListAdverseInsuranceStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.adverseInsuranceStatus.count(
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

  async publicAdverseInsuranceStatus(adverseInsuranceStatusId) {

    return this.data.adverseInsuranceStatus.findUnique({ where: { id: adverseInsuranceStatusId } , include: {legalCases: true}  })
  }
}


