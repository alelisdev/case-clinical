
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListBodyPartInput } from './dto/user-list-body-part.input'

@Injectable()
export class ApiBodyPartDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBodyParts(input?: UserListBodyPartInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPart.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectBodyParts(input?: UserListBodyPartInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPart.findMany({
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

  async publicCountBodyParts(input?: UserListBodyPartInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.bodyPart.count(
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

  async publicBodyPart(bodyPartId) {

    return this.data.bodyPart.findUnique({ where: { id: bodyPartId } , include: {leads: true}  })
  }
}


