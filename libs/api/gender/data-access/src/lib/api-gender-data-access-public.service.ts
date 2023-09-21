
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListGenderInput } from './dto/user-list-gender.input'

@Injectable()
export class ApiGenderDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicGenders(input?: UserListGenderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.gender.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectGenders(input?: UserListGenderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.gender.findMany({
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

  async publicCountGenders(input?: UserListGenderInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.gender.count(
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

  async publicGender(genderId) {

    return this.data.gender.findUnique({ where: { id: genderId } , include: {patients: true}  })
  }
}


