
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureVendorInput } from './dto/admin-create-procedure-vendor.input'
import { AdminListProcedureVendorInput } from './dto/admin-list-procedure-vendor.input'
import { AdminListCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'
import { AdminListContractInput } from '@case-clinical/api/contract/data-access'
import { AdminListVendorInput } from '@case-clinical/api/vendor/data-access'
import { AdminListProcedureVendorStatusInput } from '@case-clinical/api/procedure-vendor-status/data-access'
import { AdminUpdateProcedureVendorInput } from './dto/admin-update-procedure-vendor.input'

@Injectable()
export class ApiProcedureVendorDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureVendors(adminId: string, input?: AdminListProcedureVendorInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedureVendor.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {procedure: true, contract: true, vendor: true, status: true}
    })
  }

  async adminCountProcedureVendors(adminId: string, input?: AdminListProcedureVendorInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureVendor.count(
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

  
  

  async adminProcedureVendor(adminId: string, procedureVendorId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureVendor.findUnique({ where: { id: procedureVendorId } , include: {procedure: true, contract: true, vendor: true, status: true, caseAccounts: true, documents: true} })
  }

  async checkProcedureVendorExist(procedureVendorName: string) {
    try {
      return this.data.procedureVendor.findMany({ where: { name: procedureVendorName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureVendor(adminId: string, input: AdminCreateProcedureVendorInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureVendorData = await this.checkProcedureVendorExist(input.name)

      if (procedureVendorData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureVendor.create({
          data: { 
      
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,  
                status: 
                input.statusId != null
                ? {
                        connect:  { 
                            id: input.statusId
                        }
                    }: undefined,name: input.name, 
estimate: input.estimate, 
fundingApproved: input.fundingApproved, 

    }
    , include: {procedure: true, contract: true, vendor: true, status: true, caseAccounts: true, documents: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureVendor(adminId: string, procedureVendorId, input: AdminUpdateProcedureVendorInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureVendor.update({
      where: { id: procedureVendorId },
      data: {
  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,  
                status: 
                input.statusId != null
                ? {
                        connect:  { 
                            id: input.statusId
                        }
                    }: undefined,name: input.name, 
estimate: input.estimate, 
fundingApproved: input.fundingApproved, 

}
, include: {procedure: true, contract: true, vendor: true, status: true, caseAccounts: true, documents: true} 
    })
  }

  async adminDeleteProcedureVendor(adminId: string, procedureVendorId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureVendor.delete({ where: { id: procedureVendorId } })
  }
}

