
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContractKindInput } from './dto/user-create-contract-kind.input'
import { UserListContractKindInput } from './dto/user-list-contract-kind.input'
import { UserUpdateContractKindInput } from './dto/user-update-contract-kind.input'
import { UserUpdateContractKindsInput } from './dto/user-update-contract-kinds.input'



@Injectable()
export class ApiContractKindDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContractKinds(userId: string, input?: UserListContractKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectContractKinds(userId: string, input?: UserListContractKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractKind.findMany({
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

  async userCountContractKinds(userId: string, input?: UserListContractKindInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractKind.count(
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

  async userContractKind(userId: string, contractKindId) {

    return this.data.contractKind.findUnique({ where: { id: contractKindId } , include: {contractedRates: {include: {contract: true, contractedRateKind: true, contractKind: true}}}  })
  }

  async checkContractKindExist(contractKindName: string) {
    try {
      return this.data.contractKind.findMany({ where: { name: contractKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContractKind(userId: string, input: UserCreateContractKindInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contractKindData = await this.checkContractKindExist(input.name)

        if (contractKindData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContractKind', 'Create', input)

    let contractKind = await this.data.contractKind.create({
      data: { 
name: input.name, 

}
, include: {contractedRates: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractKind', 'Create', contractKind)

    return contractKind

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contract Kind')
    }

  }


  
  

  async userUpdateContractKind(userId: string, contractKindId: string, input: UserUpdateContractKindInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contractKindId) {
        throw new BadRequestException('Contract Kind Id is required')
      } else {

      const contractKindData = await this.checkContractKindExist(input.name)

      if (contractKindData.length > 0) {
        if (contractKindData[0].id != contractKindId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContractKind', 'Update', input)

    let contractKind = this.data.contractKind.update({
      where: { id: contractKindId },
      data: {
name: input.name, 

}
, include: {contractedRates: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContractKind', 'Update', contractKind)

    return contractKind

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contract Kind')
    }
  }

  async userUpdateContractKinds(userId: string, input: UserUpdateContractKindsInput): Promise<UpdateResult> {
    const total = input.contractKinds.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contractKinds) {
      const inputData = input.contractKinds[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const contractKindData = await this.checkContractKindExist(inputData.name)

      if (contractKindData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contractKind.upsert({
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


  async userDeleteContractKind(userId: string, contractKindId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contractKindId) {
        throw new BadRequestException('Contract Kind Id is required')
      } else {

        const contractedRateCount = await this.data.contractedRate.count({ where: { contractKindId: contractKindId }})
        if(contractedRateCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contracted Rate')
        }

        await this.data.logEvent(sendingUser, true, 'ContractKind', 'Delete', contractKindId)

        let contractKind = this.data.contractKind.delete({
          where: { id: contractKindId }
        })

        await this.data.logEvent(sendingUser, false, 'ContractKind', 'Delete', contractKind)

        return contractKind

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contract Kind')
    }
  }
}

