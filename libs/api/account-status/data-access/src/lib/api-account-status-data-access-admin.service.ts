
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAccountStatusInput } from './dto/admin-create-account-status.input'
import { AdminListAccountStatusInput } from './dto/admin-list-account-status.input'

import { AdminUpdateAccountStatusInput } from './dto/admin-update-account-status.input'

@Injectable()
export class ApiAccountStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAccountStatuses(adminId: string, input?: AdminListAccountStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.accountStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAccountStatuses(adminId: string, input?: AdminListAccountStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.accountStatus.count(
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

  
  

  async adminAccountStatus(adminId: string, accountStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.accountStatus.findUnique({ where: { id: accountStatusId } , include: {caseAccounts: true} })
  }

  async checkAccountStatusExist(accountStatusName: string) {
    try {
      return this.data.accountStatus.findMany({ where: { name: accountStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAccountStatus(adminId: string, input: AdminCreateAccountStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const accountStatusData = await this.checkAccountStatusExist(input.name)

      if (accountStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.accountStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {caseAccounts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAccountStatus(adminId: string, accountStatusId, input: AdminUpdateAccountStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.accountStatus.update({
      where: { id: accountStatusId },
      data: {
name: input.name, 

}
, include: {caseAccounts: true} 
    })
  }

  async adminDeleteAccountStatus(adminId: string, accountStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.accountStatus.delete({ where: { id: accountStatusId } })
  }
}

