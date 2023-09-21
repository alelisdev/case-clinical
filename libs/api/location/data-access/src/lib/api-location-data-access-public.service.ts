
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLocationInput } from './dto/user-list-location.input'

@Injectable()
export class ApiLocationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLocations(input?: UserListLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.location.findMany({
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {placeOfService: true}
    })
  }

  async publicSelectLocations(input?: UserListLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.location.findMany({
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountLocations(input?: UserListLocationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.location.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicLocation(locationId) {

    return this.data.location.findUnique({ where: { id: locationId } , include: {placeOfService: true, appointments: true, caseAccounts: true, caseProcedures: true, providerLocations: true, vendorLocation: true}  })
  }
}


