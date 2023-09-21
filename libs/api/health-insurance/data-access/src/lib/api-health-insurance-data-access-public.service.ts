
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListHealthInsuranceInput } from './dto/user-list-health-insurance.input'

@Injectable()
export class ApiHealthInsuranceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicHealthInsurances(input?: UserListHealthInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.healthInsurance.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectHealthInsurances(input?: UserListHealthInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.healthInsurance.findMany({
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

  async publicCountHealthInsurances(input?: UserListHealthInsuranceInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.healthInsurance.count(
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

  async publicHealthInsurance(healthInsuranceId) {

    return this.data.healthInsurance.findUnique({ where: { id: healthInsuranceId }  })
  }
}


