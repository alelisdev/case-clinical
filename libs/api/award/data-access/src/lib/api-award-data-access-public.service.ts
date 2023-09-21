
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAwardInput } from './dto/user-list-award.input'

@Injectable()
export class ApiAwardDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAwards(input?: UserListAwardInput) {
    let name = input?.name ? input.name : undefined

    return this.data.award.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectAwards(input?: UserListAwardInput) {
    let name = input?.name ? input.name : undefined

    return this.data.award.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountAwards(input?: UserListAwardInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.award.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicAward(awardId) {

    return this.data.award.findUnique({ where: { id: awardId } , include: {clinicalProvider: true}  })
  }
}


