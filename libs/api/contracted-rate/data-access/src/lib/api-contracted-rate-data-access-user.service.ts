
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContractedRateInput } from './dto/user-create-contracted-rate.input'
import { UserListContractedRateInput } from './dto/user-list-contracted-rate.input'
import { UserUpdateContractedRateInput } from './dto/user-update-contracted-rate.input'
import { UserUpdateContractedRatesInput } from './dto/user-update-contracted-rates.input'

import { UserListContractInput } from '@case-clinical/api/contract/data-access'
import { UserListContractedRateKindInput } from '@case-clinical/api/contracted-rate-kind/data-access'
import { UserListContractKindInput } from '@case-clinical/api/contract-kind/data-access'
import { UserListVisitKindInput } from '@case-clinical/api/visit-kind/data-access'
import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { UserListSpecialtyInput } from '@case-clinical/api/specialty/data-access'

@Injectable()
export class ApiContractedRateDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContractedRates(userId: string, input?: UserListContractedRateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input?.contractId,
contractedRateKindId: input?.contractedRateKindId,
contractKindId: input?.contractKindId,
visitKindId: input?.visitKindId,
clinicalProviderId: input?.clinicalProviderId,
specialtyId: input?.specialtyId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true}
    })
  }

  async userSelectContractedRates(userId: string, input?: UserListContractedRateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input?.contractId,
contractedRateKindId: input?.contractedRateKindId,
contractKindId: input?.contractKindId,
visitKindId: input?.visitKindId,
clinicalProviderId: input?.clinicalProviderId,
specialtyId: input?.specialtyId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountContractedRates(userId: string, input?: UserListContractedRateInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractedRate.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contractId: input?.contractId,
contractedRateKindId: input?.contractedRateKindId,
contractKindId: input?.contractKindId,
visitKindId: input?.visitKindId,
clinicalProviderId: input?.clinicalProviderId,
specialtyId: input?.specialtyId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userContractedRate(userId: string, contractedRateId) {

    return this.data.contractedRate.findUnique({ where: { id: contractedRateId } , include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true}  })
  }

  async checkContractedRateExist(contractedRateName: string) {
    try {
      return this.data.contractedRate.findMany({ where: { name: contractedRateName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContractedRate(userId: string, input: UserCreateContractedRateInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contractedRateData = await this.checkContractedRateExist(input.name)

        if (contractedRateData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContractedRate', 'Create', input)

    let contractedRate = await this.data.contractedRate.create({
      data: { 
  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                contractedRateKind: 
                input.contractedRateKindId != null
                ? {
                        connect:  { 
                            id: input.contractedRateKindId
                        }
                    }: undefined,  
                contractKind: 
                input.contractKindId != null
                ? {
                        connect:  { 
                            id: input.contractKindId
                        }
                    }: undefined,  
                visitKind: 
                input.visitKindId != null
                ? {
                        connect:  { 
                            id: input.visitKindId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
percentage: input.percentage, 
reimbursedRate: input.reimbursedRate, 
billOnBehalf: input.billOnBehalf, 

}
, include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractedRate', 'Create', contractedRate)

    return contractedRate

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contracted Rate')
    }

  }


  
  

  async userUpdateContractedRate(userId: string, contractedRateId: string, input: UserUpdateContractedRateInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contractedRateId) {
        throw new BadRequestException('Contracted Rate Id is required')
      } else {

      const contractedRateData = await this.checkContractedRateExist(input.name)

      if (contractedRateData.length > 0) {
        if (contractedRateData[0].id != contractedRateId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContractedRate', 'Update', input)

    let contractedRate = this.data.contractedRate.update({
      where: { id: contractedRateId },
      data: {
  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                contractedRateKind: 
                input.contractedRateKindId != null
                ? {
                        connect:  { 
                            id: input.contractedRateKindId
                        }
                    }: undefined,  
                contractKind: 
                input.contractKindId != null
                ? {
                        connect:  { 
                            id: input.contractKindId
                        }
                    }: undefined,  
                visitKind: 
                input.visitKindId != null
                ? {
                        connect:  { 
                            id: input.visitKindId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
percentage: input.percentage, 
reimbursedRate: input.reimbursedRate, 
billOnBehalf: input.billOnBehalf, 

}
, include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractedRate', 'Update', contractedRate)

    return contractedRate

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contracted Rate')
    }
  }

  async userUpdateContractedRates(userId: string, input: UserUpdateContractedRatesInput): Promise<UpdateResult> {
    const total = input.contractedRates.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contractedRates) {
      const inputData = input.contractedRates[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
amount: inputData.amount, 
percentage: inputData.percentage, 
reimbursedRate: inputData.reimbursedRate, 
billOnBehalf: inputData.billOnBehalf, 
contractId: inputData.contractId, 
contractedRateKindId: inputData.contractedRateKindId, 
contractKindId: inputData.contractKindId, 
visitKindId: inputData.visitKindId, 
clinicalProviderId: inputData.clinicalProviderId, 
specialtyId: inputData.specialtyId, 

      }

      const contractedRateData = await this.checkContractedRateExist(inputData.name)

      if (contractedRateData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contractedRate.upsert({
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


  async userDeleteContractedRate(userId: string, contractedRateId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contractedRateId) {
        throw new BadRequestException('Contracted Rate Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'ContractedRate', 'Delete', contractedRateId)

        let contractedRate = this.data.contractedRate.delete({
          where: { id: contractedRateId }
        })

        await this.data.logEvent(sendingUser, false, 'ContractedRate', 'Delete', contractedRate)

        return contractedRate

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Contracted Rate')
    }
  }
}

