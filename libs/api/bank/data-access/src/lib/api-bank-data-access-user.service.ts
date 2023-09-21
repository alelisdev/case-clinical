
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateBankInput } from './dto/user-create-bank.input'
import { UserListBankInput } from './dto/user-list-bank.input'
import { UserUpdateBankInput } from './dto/user-update-bank.input'
import { UserUpdateBanksInput } from './dto/user-update-banks.input'



@Injectable()
export class ApiBankDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBanks(userId: string, input?: UserListBankInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bank.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectBanks(userId: string, input?: UserListBankInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bank.findMany({
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

  async userCountBanks(userId: string, input?: UserListBankInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.bank.count(
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

  async userBank(userId: string, bankId) {

    return this.data.bank.findUnique({ where: { id: bankId } , include: {payments: {include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}}}  })
  }

  async checkBankExist(bankName: string) {
    try {
      return this.data.bank.findMany({ where: { name: bankName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateBank(userId: string, input: UserCreateBankInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const bankData = await this.checkBankExist(input.name)

        if (bankData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Bank', 'Create', input)

    let bank = await this.data.bank.create({
      data: { 
name: input.name, 

}
, include: {payments: {include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Bank', 'Create', bank)

    return bank

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Bank')
    }

  }


  
  

  async userUpdateBank(userId: string, bankId: string, input: UserUpdateBankInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!bankId) {
        throw new BadRequestException('Bank Id is required')
      } else {

      const bankData = await this.checkBankExist(input.name)

      if (bankData.length > 0) {
        if (bankData[0].id != bankId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Bank', 'Update', input)

    let bank = this.data.bank.update({
      where: { id: bankId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Bank', 'Update', bank)

    return bank

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Bank')
    }
  }

  async userUpdateBanks(userId: string, input: UserUpdateBanksInput): Promise<UpdateResult> {
    const total = input.banks.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.banks) {
      const inputData = input.banks[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const bankData = await this.checkBankExist(inputData.name)

      if (bankData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.bank.upsert({
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


  async userDeleteBank(userId: string, bankId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!bankId) {
        throw new BadRequestException('Bank Id is required')
      } else {

        const paymentCount = await this.data.payment.count({ where: { bankId: bankId }})
        if(paymentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Payment')
        }

        await this.data.logEvent(sendingUser, true, 'Bank', 'Delete', bankId)

        let bank = this.data.bank.delete({
          where: { id: bankId }
        })

        await this.data.logEvent(sendingUser, false, 'Bank', 'Delete', bank)

        return bank

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Bank')
    }
  }
}

