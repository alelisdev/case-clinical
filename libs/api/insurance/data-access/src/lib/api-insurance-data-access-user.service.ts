
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateInsuranceInput } from './dto/user-create-insurance.input'
import { UserListInsuranceInput } from './dto/user-list-insurance.input'
import { UserUpdateInsuranceInput } from './dto/user-update-insurance.input'
import { UserUpdateInsurancesInput } from './dto/user-update-insurances.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserListInsuranceTypeInput } from '@case-clinical/api/insurance-type/data-access'
import { UserListInsuranceSectorInput } from '@case-clinical/api/insurance-sector/data-access'
import { UserListLeadInput } from '@case-clinical/api/lead/data-access'

@Injectable()
export class ApiInsuranceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userInsurances(userId: string, input?: UserListInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insurance.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
insuranceTypeId: input?.insuranceTypeId,
insuranceSectorId: input?.insuranceSectorId,
leadId: input?.leadId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true}
    })
  }

  async userSelectInsurances(userId: string, input?: UserListInsuranceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.insurance.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
insuranceTypeId: input?.insuranceTypeId,
insuranceSectorId: input?.insuranceSectorId,
leadId: input?.leadId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountInsurances(userId: string, input?: UserListInsuranceInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.insurance.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
insuranceTypeId: input?.insuranceTypeId,
insuranceSectorId: input?.insuranceSectorId,
leadId: input?.leadId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userInsurance(userId: string, insuranceId) {

    return this.data.insurance.findUnique({ where: { id: insuranceId } , include: {legalCase: true, insuranceType: true, insuranceSector: true, lead: true}  })
  }

  async checkInsuranceExist(insuranceName: string, legalCaseId:string) {
    try {
      return this.data.insurance.findMany({ where: { name: insuranceName, legalCaseId:legalCaseId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateInsurance(userId: string, input: UserCreateInsuranceInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const insuranceData = await this.checkInsuranceExist(input.name, input.legalCaseId)

        if (insuranceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Insurance', 'Create', input)

    let insurance = await this.data.insurance.create({
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

    await this.data.logEvent(sendingUser, false, 'Insurance', 'Create', insurance)

    return insurance

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Insurance')
    }

  }


  
  

  async userUpdateInsurance(userId: string, insuranceId: string, input: UserUpdateInsuranceInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!insuranceId) {
        throw new BadRequestException('Insurance Id is required')
      } else {

      const insuranceData = await this.checkInsuranceExist(input.name, input.legalCaseId)

      if (insuranceData.length > 0) {
        if (insuranceData[0].id != insuranceId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Insurance', 'Update', input)

    let insurance = this.data.insurance.update({
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

    await this.data.logEvent(sendingUser, false, 'Insurance', 'Update', insurance)

    return insurance

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Insurance')
    }
  }

  async userUpdateInsurances(userId: string, input: UserUpdateInsurancesInput): Promise<UpdateResult> {
    const total = input.insurances.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.insurances) {
      const inputData = input.insurances[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
legalCaseId: inputData.legalCaseId, 
insuranceTypeId: inputData.insuranceTypeId, 
insuranceSectorId: inputData.insuranceSectorId, 
policyNumber: inputData.policyNumber, 
insuranceCompany: inputData.insuranceCompany, 
minimumCoverageAmount: inputData.minimumCoverageAmount, 
maximumCoverageAmount: inputData.maximumCoverageAmount, 
isStackable: inputData.isStackable, 
adjuster: inputData.adjuster, 
leadId: inputData.leadId, 

      }

      const insuranceData = await this.checkInsuranceExist(inputData.name, inputData.legalCaseId)

      if (insuranceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.insurance.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteInsurance(userId: string, insuranceId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!insuranceId) {
        throw new BadRequestException('Insurance Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'Insurance', 'Delete', insuranceId)

        let insurance = this.data.insurance.delete({
          where: { id: insuranceId }
        })

        await this.data.logEvent(sendingUser, false, 'Insurance', 'Delete', insurance)

        return insurance

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Insurance')
    }
  }
}

