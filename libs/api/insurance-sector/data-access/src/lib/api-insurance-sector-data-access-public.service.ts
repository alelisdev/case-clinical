
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListInsuranceSectorInput } from './dto/user-list-insurance-sector.input'

@Injectable()
export class ApiInsuranceSectorDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicInsuranceSectors(input?: UserListInsuranceSectorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceSector.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectInsuranceSectors(input?: UserListInsuranceSectorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insuranceSector.findMany({
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

  async publicCountInsuranceSectors(input?: UserListInsuranceSectorInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.insuranceSector.count(
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

  async publicInsuranceSector(insuranceSectorId) {

    return this.data.insuranceSector.findUnique({ where: { id: insuranceSectorId } , include: {insurances: true}  })
  }
}


