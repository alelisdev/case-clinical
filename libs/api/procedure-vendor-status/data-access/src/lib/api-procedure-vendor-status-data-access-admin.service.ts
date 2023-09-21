
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureVendorStatusInput } from './dto/admin-create-procedure-vendor-status.input'
import { AdminListProcedureVendorStatusInput } from './dto/admin-list-procedure-vendor-status.input'

import { AdminUpdateProcedureVendorStatusInput } from './dto/admin-update-procedure-vendor-status.input'

@Injectable()
export class ApiProcedureVendorStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureVendorStatuses(adminId: string, input?: AdminListProcedureVendorStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedureVendorStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountProcedureVendorStatuses(adminId: string, input?: AdminListProcedureVendorStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureVendorStatus.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminProcedureVendorStatus(adminId: string, procedureVendorStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureVendorStatus.findUnique({ where: { id: procedureVendorStatusId } , include: {procedureVendors: true} })
  }

  async checkProcedureVendorStatusExist(procedureVendorStatusName: string) {
    try {
      return this.data.procedureVendorStatus.findMany({ where: { name: procedureVendorStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureVendorStatus(adminId: string, input: AdminCreateProcedureVendorStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureVendorStatusData = await this.checkProcedureVendorStatusExist(input.name)

      if (procedureVendorStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureVendorStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {procedureVendors: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureVendorStatus(adminId: string, procedureVendorStatusId, input: AdminUpdateProcedureVendorStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureVendorStatus.update({
      where: { id: procedureVendorStatusId },
      data: {
name: input.name, 

}
, include: {procedureVendors: true} 
    })
  }

  async adminDeleteProcedureVendorStatus(adminId: string, procedureVendorStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureVendorStatus.delete({ where: { id: procedureVendorStatusId } })
  }
}

