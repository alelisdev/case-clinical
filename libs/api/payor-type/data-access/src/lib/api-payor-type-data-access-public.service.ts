
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPayorTypeInput } from './dto/user-list-payor-type.input'

@Injectable()
export class ApiPayorTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPayorTypes(input?: UserListPayorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payorType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectPayorTypes(input?: UserListPayorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payorType.findMany({
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

  async publicCountPayorTypes(input?: UserListPayorTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.payorType.count(
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

  async publicPayorType(payorTypeId) {

    return this.data.payorType.findUnique({ where: { id: payorTypeId } , include: {payments: true}  })
  }
}


