
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListVendorInput } from './dto/user-list-vendor.input'

@Injectable()
export class ApiVendorDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicVendors(input?: UserListVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorTypeId: input.vendorTypeId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {vendorType: true}
    })
  }

  async publicSelectVendors(input?: UserListVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorTypeId: input.vendorTypeId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountVendors(input?: UserListVendorInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.vendor.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorTypeId: input.vendorTypeId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicVendor(vendorId) {

    return this.data.vendor.findUnique({ where: { id: vendorId } , include: {vendorType: true, assignedDocuments: true, caseAccounts: true, clinicalProviders: true, contracts: true, durableMedicalEquipments: true, procedureVendors: true, vendorLocations: true}  })
  }
}


