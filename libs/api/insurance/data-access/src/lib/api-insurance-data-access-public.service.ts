
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListInsuranceInput } from './dto/user-list-insurance.input'

@Injectable()
export class ApiInsuranceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicInsurances(input?: UserListInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insurance.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
insuranceTypeId: input.insuranceTypeId,
insuranceSectorId: input.insuranceSectorId,
leadId: input.leadId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true}
    })
  }

  async publicSelectInsurances(input?: UserListInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insurance.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
insuranceTypeId: input.insuranceTypeId,
insuranceSectorId: input.insuranceSectorId,
leadId: input.leadId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountInsurances(input?: UserListInsuranceInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.insurance.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
insuranceTypeId: input.insuranceTypeId,
insuranceSectorId: input.insuranceSectorId,
leadId: input.leadId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicInsurance(insuranceId) {

    return this.data.insurance.findUnique({ where: { id: insuranceId } , include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true}  })
  }
}


