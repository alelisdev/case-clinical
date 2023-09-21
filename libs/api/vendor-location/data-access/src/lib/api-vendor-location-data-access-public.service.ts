
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListVendorLocationInput } from './dto/user-list-vendor-location.input'

@Injectable()
export class ApiVendorLocationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicVendorLocations(input?: UserListVendorLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
vendorId: input.vendorId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {locations: true, vendor: true}
    })
  }

  async publicSelectVendorLocations(input?: UserListVendorLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
vendorId: input.vendorId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountVendorLocations(input?: UserListVendorLocationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.vendorLocation.count(
    {
      where: {
            AND: [{
            name: { contains: name },
vendorId: input.vendorId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicVendorLocation(vendorLocationId) {

    return this.data.vendorLocation.findUnique({ where: { id: vendorLocationId } , include: {locations: true, vendor: true}  })
  }
}


