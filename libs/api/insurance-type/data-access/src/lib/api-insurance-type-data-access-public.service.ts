
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListInsuranceTypeInput } from './dto/user-list-insurance-type.input'

@Injectable()
export class ApiInsuranceTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicInsuranceTypes(input?: UserListInsuranceTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectInsuranceTypes(input?: UserListInsuranceTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceType.findMany({
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

  async publicCountInsuranceTypes(input?: UserListInsuranceTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.insuranceType.count(
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

  async publicInsuranceType(insuranceTypeId) {

    return this.data.insuranceType.findUnique({ where: { id: insuranceTypeId } , include: {insurances: true}  })
  }
}


