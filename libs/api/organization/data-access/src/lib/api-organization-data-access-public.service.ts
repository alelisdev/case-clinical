
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListOrganizationInput } from './dto/user-list-organization.input'

@Injectable()
export class ApiOrganizationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicOrganizations(input?: UserListOrganizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.organization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectOrganizations(input?: UserListOrganizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.organization.findMany({
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

  async publicCountOrganizations(input?: UserListOrganizationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.organization.count(
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

  async publicOrganization(organizationId) {

    return this.data.organization.findUnique({ where: { id: organizationId } , include: {contracts: true, liensHeld: true, facilityFeeSchedules: true, feeSchedules: true}  })
  }
}


