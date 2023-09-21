
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListManufacturerInput } from './dto/user-list-manufacturer.input'

@Injectable()
export class ApiManufacturerDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicManufacturers(input?: UserListManufacturerInput) {
    let name = input?.name ? input.name : undefined

    return this.data.manufacturer.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectManufacturers(input?: UserListManufacturerInput) {
    let name = input?.name ? input.name : undefined

    return this.data.manufacturer.findMany({
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

  async publicCountManufacturers(input?: UserListManufacturerInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.manufacturer.count(
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

  async publicManufacturer(manufacturerId) {

    return this.data.manufacturer.findUnique({ where: { id: manufacturerId } , include: {implants: true}  })
  }
}


