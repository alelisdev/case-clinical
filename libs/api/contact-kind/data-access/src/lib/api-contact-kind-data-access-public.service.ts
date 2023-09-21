
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContactKindInput } from './dto/user-list-contact-kind.input'

@Injectable()
export class ApiContactKindDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContactKinds(input?: UserListContactKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectContactKinds(input?: UserListContactKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactKind.findMany({
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

  async publicCountContactKinds(input?: UserListContactKindInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contactKind.count(
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

  async publicContactKind(contactKindId) {

    return this.data.contactKind.findUnique({ where: { id: contactKindId } , include: {contacts: true}  })
  }
}


