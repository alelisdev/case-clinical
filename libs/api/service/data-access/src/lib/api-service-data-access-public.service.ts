
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListServiceInput } from './dto/user-list-service.input'

@Injectable()
export class ApiServiceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicServices(input?: UserListServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.service.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectServices(input?: UserListServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.service.findMany({
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

  async publicCountServices(input?: UserListServiceInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.service.count(
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

  async publicService(serviceId) {

    return this.data.service.findUnique({ where: { id: serviceId } , include: {clinicalProviderServices: true}  })
  }
}


