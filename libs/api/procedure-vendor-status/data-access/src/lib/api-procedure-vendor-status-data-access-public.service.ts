
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureVendorStatusInput } from './dto/user-list-procedure-vendor-status.input'

@Injectable()
export class ApiProcedureVendorStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureVendorStatuses(input?: UserListProcedureVendorStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendorStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectProcedureVendorStatuses(input?: UserListProcedureVendorStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendorStatus.findMany({
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

  async publicCountProcedureVendorStatuses(input?: UserListProcedureVendorStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureVendorStatus.count(
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

  async publicProcedureVendorStatus(procedureVendorStatusId) {

    return this.data.procedureVendorStatus.findUnique({ where: { id: procedureVendorStatusId } , include: {procedureVendors: true}  })
  }
}


