
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCaseAccountInput } from './dto/user-list-case-account.input'

@Injectable()
export class ApiCaseAccountDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCaseAccounts(input?: UserListCaseAccountInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccount.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
locationId: input.locationId,
vendorId: input.vendorId,
accountStatusId: input.accountStatusId,
procedureTypeId: input.procedureTypeId,
agreementTypeId: input.agreementTypeId,
claimProcedureId: input.claimProcedureId,
invoiceDetailId: input.invoiceDetailId,
contractId: input.contractId,
portfolioId: input.portfolioId,
procedureVendorId: input.procedureVendorId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true}
    })
  }

  async publicSelectCaseAccounts(input?: UserListCaseAccountInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccount.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
locationId: input.locationId,
vendorId: input.vendorId,
accountStatusId: input.accountStatusId,
procedureTypeId: input.procedureTypeId,
agreementTypeId: input.agreementTypeId,
claimProcedureId: input.claimProcedureId,
invoiceDetailId: input.invoiceDetailId,
contractId: input.contractId,
portfolioId: input.portfolioId,
procedureVendorId: input.procedureVendorId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountCaseAccounts(input?: UserListCaseAccountInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.caseAccount.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
locationId: input.locationId,
vendorId: input.vendorId,
accountStatusId: input.accountStatusId,
procedureTypeId: input.procedureTypeId,
agreementTypeId: input.agreementTypeId,
claimProcedureId: input.claimProcedureId,
invoiceDetailId: input.invoiceDetailId,
contractId: input.contractId,
portfolioId: input.portfolioId,
procedureVendorId: input.procedureVendorId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicCaseAccount(caseAccountId) {

    return this.data.caseAccount.findUnique({ where: { id: caseAccountId } , include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true, caseAccountPayments: true, journalEntries: true, writeOffs: true}  })
  }
}


