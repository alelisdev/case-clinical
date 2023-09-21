
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContractedRateKindInput } from './dto/user-create-contracted-rate-kind.input'
import { UserListContractedRateKindInput } from './dto/user-list-contracted-rate-kind.input'
import { UserUpdateContractedRateKindInput } from './dto/user-update-contracted-rate-kind.input'
import { UserUpdateContractedRateKindsInput } from './dto/user-update-contracted-rate-kinds.input'



@Injectable()
export class ApiContractedRateKindDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContractedRateKinds(userId: string, input?: UserListContractedRateKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRateKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectContractedRateKinds(userId: string, input?: UserListContractedRateKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRateKind.findMany({
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

  async userCountContractedRateKinds(userId: string, input?: UserListContractedRateKindInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractedRateKind.count(
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

  async userContractedRateKind(userId: string, contractedRateKindId) {

    return this.data.contractedRateKind.findUnique({ where: { id: contractedRateKindId } , include: {contractedRates: {include: {contract: true, contractedRateKind: true, contractKind: true}}}  })
  }

  async checkContractedRateKindExist(contractedRateKindName: string) {
    try {
      return this.data.contractedRateKind.findMany({ where: { name: contractedRateKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContractedRateKind(userId: string, input: UserCreateContractedRateKindInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contractedRateKindData = await this.checkContractedRateKindExist(input.name)

        if (contractedRateKindData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContractedRateKind', 'Create', input)

    let contractedRateKind = await this.data.contractedRateKind.create({
      data: { 
name: input.name, 
code: input.code, 
value: input.value, 

}
, include: {contractedRates: {include: {contract: true, contractedRateKind: true, contractKind: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractedRateKind', 'Create', contractedRateKind)

    return contractedRateKind

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contracted Rate Kind')
    }

  }


  
  

  async userUpdateContractedRateKind(userId: string, contractedRateKindId: string, input: UserUpdateContractedRateKindInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contractedRateKindId) {
        throw new BadRequestException('Contracted Rate Kind Id is required')
      } else {

      const contractedRateKindData = await this.checkContractedRateKindExist(input.name)

      if (contractedRateKindData.length > 0) {
        if (contractedRateKindData[0].id != contractedRateKindId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContractedRateKind', 'Update', input)

    let contractedRateKind = this.data.contractedRateKind.update({
      where: { id: contractedRateKindId },
      data: {
name: input.name, 
code: input.code, 
value: input.value, 

}
, include: {contractedRates: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractedRateKind', 'Update', contractedRateKind)

    return contractedRateKind

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contracted Rate Kind')
    }
  }

  async userUpdateContractedRateKinds(userId: string, input: UserUpdateContractedRateKindsInput): Promise<UpdateResult> {
    const total = input.contractedRateKinds.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contractedRateKinds) {
      const inputData = input.contractedRateKinds[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
code: inputData.code, 
value: inputData.value, 

      }

      const contractedRateKindData = await this.checkContractedRateKindExist(inputData.name)

      if (contractedRateKindData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contractedRateKind.upsert({
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


  async userDeleteContractedRateKind(userId: string, contractedRateKindId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contractedRateKindId) {
        throw new BadRequestException('Contracted Rate Kind Id is required')
      } else {

        const contractedRateCount = await this.data.contractedRate.count({ where: { contractedRateKindId: contractedRateKindId }})
        if(contractedRateCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contracted Rate')
        }

        await this.data.logEvent(sendingUser, true, 'ContractedRateKind', 'Delete', contractedRateKindId)

        let contractedRateKind = this.data.contractedRateKind.delete({
          where: { id: contractedRateKindId }
        })

        await this.data.logEvent(sendingUser, false, 'ContractedRateKind', 'Delete', contractedRateKind)

        return contractedRateKind

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contracted Rate Kind')
    }
  }
}

