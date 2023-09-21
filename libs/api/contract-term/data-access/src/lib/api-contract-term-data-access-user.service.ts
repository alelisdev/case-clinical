
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContractTermInput } from './dto/user-create-contract-term.input'
import { UserListContractTermInput } from './dto/user-list-contract-term.input'
import { UserUpdateContractTermInput } from './dto/user-update-contract-term.input'
import { UserUpdateContractTermsInput } from './dto/user-update-contract-terms.input'

import { UserListContractInput } from '@case-clinical/api/contract/data-access'

@Injectable()
export class ApiContractTermDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContractTerms(userId: string, input?: UserListContractTermInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractTerm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractTermId: input?.contractTermId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true}
    })
  }

  async userSelectContractTerms(userId: string, input?: UserListContractTermInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractTerm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractTermId: input?.contractTermId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountContractTerms(userId: string, input?: UserListContractTermInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractTerm.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contractTermId: input?.contractTermId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userContractTerm(userId: string, contractTermId) {

    return this.data.contractTerm.findUnique({ where: { id: contractTermId } , include: {contract: true}  })
  }

  async checkContractTermExist(contractTermName: string) {
    try {
      return this.data.contractTerm.findMany({ where: { name: contractTermName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContractTerm(userId: string, input: UserCreateContractTermInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contractTermData = await this.checkContractTermExist(input.name)

        if (contractTermData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContractTerm', 'Create', input)

    let contractTerm = await this.data.contractTerm.create({
      data: { 
  
                contract: 
                input.contractTermId != null
                ? {
                        connect:  { 
                            id: input.contractTermId
                        }
                    }: undefined,name: input.name, 
maxApproved: input.maxApproved, 
numberIncluded: input.numberIncluded, 
factor: input.factor, 

}
, include: {contract: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractTerm', 'Create', contractTerm)

    return contractTerm

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contract Term')
    }

  }


  
  

  async userUpdateContractTerm(userId: string, contractTermId: string, input: UserUpdateContractTermInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contractTermId) {
        throw new BadRequestException('Contract Term Id is required')
      } else {

      const contractTermData = await this.checkContractTermExist(input.name)

      if (contractTermData.length > 0) {
        if (contractTermData[0].id != contractTermId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContractTerm', 'Update', input)

    let contractTerm = this.data.contractTerm.update({
      where: { id: contractTermId },
      data: {
  
                contract: 
                input.contractTermId != null
                ? {
                        connect:  { 
                            id: input.contractTermId
                        }
                    }: undefined,name: input.name, 
maxApproved: input.maxApproved, 
numberIncluded: input.numberIncluded, 
factor: input.factor, 

}
, include: {contract: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractTerm', 'Update', contractTerm)

    return contractTerm

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contract Term')
    }
  }

  async userUpdateContractTerms(userId: string, input: UserUpdateContractTermsInput): Promise<UpdateResult> {
    const total = input.contractTerms.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contractTerms) {
      const inputData = input.contractTerms[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
maxApproved: inputData.maxApproved, 
numberIncluded: inputData.numberIncluded, 
factor: inputData.factor, 
contractTermId: inputData.contractTermId, 

      }

      const contractTermData = await this.checkContractTermExist(inputData.name)

      if (contractTermData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contractTerm.upsert({
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


  async userDeleteContractTerm(userId: string, contractTermId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contractTermId) {
        throw new BadRequestException('Contract Term Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'ContractTerm', 'Delete', contractTermId)

        let contractTerm = this.data.contractTerm.delete({
          where: { id: contractTermId }
        })

        await this.data.logEvent(sendingUser, false, 'ContractTerm', 'Delete', contractTerm)

        return contractTerm

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contract Term')
    }
  }
}

