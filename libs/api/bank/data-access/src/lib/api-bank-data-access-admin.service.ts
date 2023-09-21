
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateBankInput } from './dto/admin-create-bank.input'
import { AdminListBankInput } from './dto/admin-list-bank.input'

import { AdminUpdateBankInput } from './dto/admin-update-bank.input'

@Injectable()
export class ApiBankDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminBanks(adminId: string, input?: AdminListBankInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.bank.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountBanks(adminId: string, input?: AdminListBankInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.bank.count(
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

  
  

  async adminBank(adminId: string, bankId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.bank.findUnique({ where: { id: bankId } , include: {payments: true} })
  }

  async checkBankExist(bankName: string) {
    try {
      return this.data.bank.findMany({ where: { name: bankName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateBank(adminId: string, input: AdminCreateBankInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const bankData = await this.checkBankExist(input.name)

      if (bankData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.bank.create({
          data: { 
    name: input.name, 

    }
    , include: {payments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateBank(adminId: string, bankId, input: AdminUpdateBankInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.bank.update({
      where: { id: bankId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })
  }

  async adminDeleteBank(adminId: string, bankId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.bank.delete({ where: { id: bankId } })
  }
}

