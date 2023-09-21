
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCalculationBasisTypeInput } from './dto/user-list-calculation-basis-type.input'

@Injectable()
export class ApiCalculationBasisTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCalculationBasisTypes(input?: UserListCalculationBasisTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.calculationBasisType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectCalculationBasisTypes(input?: UserListCalculationBasisTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.calculationBasisType.findMany({
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

  async publicCountCalculationBasisTypes(input?: UserListCalculationBasisTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.calculationBasisType.count(
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

  async publicCalculationBasisType(calculationBasisTypeId) {

    return this.data.calculationBasisType.findUnique({ where: { id: calculationBasisTypeId } , include: {contracts: true}  })
  }
}


