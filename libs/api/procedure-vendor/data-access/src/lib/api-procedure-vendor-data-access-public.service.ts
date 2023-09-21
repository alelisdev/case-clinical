
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureVendorInput } from './dto/user-list-procedure-vendor.input'

@Injectable()
export class ApiProcedureVendorDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureVendors(input?: UserListProcedureVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureId: input.procedureId,
contractId: input.contractId,
vendorId: input.vendorId,
statusId: input.statusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {procedure: true, contract: true, vendor: true, status: true}
    })
  }

  async publicSelectProcedureVendors(input?: UserListProcedureVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureId: input.procedureId,
contractId: input.contractId,
vendorId: input.vendorId,
statusId: input.statusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountProcedureVendors(input?: UserListProcedureVendorInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureVendor.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            procedureId: input.procedureId,
contractId: input.contractId,
vendorId: input.vendorId,
statusId: input.statusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicProcedureVendor(procedureVendorId) {

    return this.data.procedureVendor.findUnique({ where: { id: procedureVendorId } , include: {procedure: true, contract: true, vendor: true, status: true, caseAccounts: true, documents: true}  })
  }
}


