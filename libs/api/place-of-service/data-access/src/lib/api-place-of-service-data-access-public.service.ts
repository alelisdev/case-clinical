
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPlaceOfServiceInput } from './dto/user-list-place-of-service.input'

@Injectable()
export class ApiPlaceOfServiceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPlaceOfServices(input?: UserListPlaceOfServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.placeOfService.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectPlaceOfServices(input?: UserListPlaceOfServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.placeOfService.findMany({
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

  async publicCountPlaceOfServices(input?: UserListPlaceOfServiceInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.placeOfService.count(
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

  async publicPlaceOfService(placeOfServiceId) {

    return this.data.placeOfService.findUnique({ where: { id: placeOfServiceId } , include: {claimProcedures: true, locations: true}  })
  }
}


