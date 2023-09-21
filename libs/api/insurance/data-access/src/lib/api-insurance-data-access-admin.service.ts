
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateInsuranceInput } from './dto/admin-create-insurance.input'
import { AdminListInsuranceInput } from './dto/admin-list-insurance.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListInsuranceTypeInput } from '@case-clinical/api/insurance-type/data-access'
import { AdminListInsuranceSectorInput } from '@case-clinical/api/insurance-sector/data-access'
import { AdminListLeadInput } from '@case-clinical/api/lead/data-access'
import { AdminUpdateInsuranceInput } from './dto/admin-update-insurance.input'

@Injectable()
export class ApiInsuranceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminInsurances(adminId: string, input?: AdminListInsuranceInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.insurance.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true}
    })
  }

  async adminCountInsurances(adminId: string, input?: AdminListInsuranceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.insurance.count(
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

  
  

  async adminInsurance(adminId: string, insuranceId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.insurance.findUnique({ where: { id: insuranceId } , include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true} })
  }

  async checkInsuranceExist(insuranceName: string) {
    try {
      return this.data.insurance.findMany({ where: { name: insuranceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateInsurance(adminId: string, input: AdminCreateInsuranceInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const insuranceData = await this.checkInsuranceExist(input.name)

      if (insuranceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.insurance.create({
          data: { 
      
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                insuranceType: 
                input.insuranceTypeId != null
                ? {
                        connect:  { 
                            id: input.insuranceTypeId
                        }
                    }: undefined,  
                insuranceSector: 
                input.insuranceSectorId != null
                ? {
                        connect:  { 
                            id: input.insuranceSectorId
                        }
                    }: undefined,  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,name: input.name, 
policyNumber: input.policyNumber, 
insuranceCompany: input.insuranceCompany, 
minimumCoverageAmount: input.minimumCoverageAmount, 
maximumCoverageAmount: input.maximumCoverageAmount, 
isStackable: input.isStackable, 
adjuster: input.adjuster, 

    }
    , include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateInsurance(adminId: string, insuranceId, input: AdminUpdateInsuranceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.insurance.update({
      where: { id: insuranceId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                insuranceType: 
                input.insuranceTypeId != null
                ? {
                        connect:  { 
                            id: input.insuranceTypeId
                        }
                    }: undefined,  
                insuranceSector: 
                input.insuranceSectorId != null
                ? {
                        connect:  { 
                            id: input.insuranceSectorId
                        }
                    }: undefined,  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,name: input.name, 
policyNumber: input.policyNumber, 
insuranceCompany: input.insuranceCompany, 
minimumCoverageAmount: input.minimumCoverageAmount, 
maximumCoverageAmount: input.maximumCoverageAmount, 
isStackable: input.isStackable, 
adjuster: input.adjuster, 

}
, include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true} 
    })
  }

  async adminDeleteInsurance(adminId: string, insuranceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.insurance.delete({ where: { id: insuranceId } })
  }
}

