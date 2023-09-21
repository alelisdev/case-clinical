
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAttorneyInput } from './dto/user-list-attorney.input'

@Injectable()
export class ApiAttorneyDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAttorneys(input?: UserListAttorneyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorney.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmId: input.firmId,
attorneyStatusId: input.attorneyStatusId,
attorneyTypeId: input.attorneyTypeId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {firm: true, attorneyStatus: true, attorneyType: true}
    })
  }

  async publicSelectAttorneys(input?: UserListAttorneyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorney.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmId: input.firmId,
attorneyStatusId: input.attorneyStatusId,
attorneyTypeId: input.attorneyTypeId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountAttorneys(input?: UserListAttorneyInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.attorney.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            firmId: input.firmId,
attorneyStatusId: input.attorneyStatusId,
attorneyTypeId: input.attorneyTypeId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicAttorney(attorneyId) {

    return this.data.attorney.findUnique({ where: { id: attorneyId } , include: {firm: true, attorneyStatus: true, attorneyType: true, legalCases: true, user: true}  })
  }
}


