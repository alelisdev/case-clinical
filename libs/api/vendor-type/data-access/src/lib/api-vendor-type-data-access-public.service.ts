
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListVendorTypeInput } from './dto/user-list-vendor-type.input'

@Injectable()
export class ApiVendorTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicVendorTypes(input?: UserListVendorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectVendorTypes(input?: UserListVendorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorType.findMany({
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

  async publicCountVendorTypes(input?: UserListVendorTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.vendorType.count(
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

  async publicVendorType(vendorTypeId) {

    return this.data.vendorType.findUnique({ where: { id: vendorTypeId } , include: {vendors: true}  })
  }
}


