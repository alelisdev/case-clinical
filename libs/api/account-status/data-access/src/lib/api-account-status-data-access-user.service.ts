
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAccountStatusInput } from './dto/user-create-account-status.input'
import { UserListAccountStatusInput } from './dto/user-list-account-status.input'
import { UserUpdateAccountStatusInput } from './dto/user-update-account-status.input'
import { UserUpdateAccountStatusesInput } from './dto/user-update-account-statuses.input'



@Injectable()
export class ApiAccountStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAccountStatuses(userId: string, input?: UserListAccountStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accountStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAccountStatuses(userId: string, input?: UserListAccountStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accountStatus.findMany({
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

  async userCountAccountStatuses(userId: string, input?: UserListAccountStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.accountStatus.count(
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

  async userAccountStatus(userId: string, accountStatusId) {

    return this.data.accountStatus.findUnique({ where: { id: accountStatusId } , include: {caseAccounts: {include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true, portfolio: true, procedureVendor: true}}}  })
  }

  async checkAccountStatusExist(accountStatusName: string) {
    try {
      return this.data.accountStatus.findMany({ where: { name: accountStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAccountStatus(userId: string, input: UserCreateAccountStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const accountStatusData = await this.checkAccountStatusExist(input.name)

        if (accountStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AccountStatus', 'Create', input)

    let accountStatus = await this.data.accountStatus.create({
      data: { 
name: input.name, 

}
, include: {caseAccounts: {include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true, portfolio: true, procedureVendor: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'AccountStatus', 'Create', accountStatus)

    return accountStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Account Status')
    }

  }


  
  

  async userUpdateAccountStatus(userId: string, accountStatusId: string, input: UserUpdateAccountStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!accountStatusId) {
        throw new BadRequestException('Account Status Id is required')
      } else {

      const accountStatusData = await this.checkAccountStatusExist(input.name)

      if (accountStatusData.length > 0) {
        if (accountStatusData[0].id != accountStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AccountStatus', 'Update', input)

    let accountStatus = this.data.accountStatus.update({
      where: { id: accountStatusId },
      data: {
name: input.name, 

}
, include: {caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AccountStatus', 'Update', accountStatus)

    return accountStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Account Status')
    }
  }

  async userUpdateAccountStatuses(userId: string, input: UserUpdateAccountStatusesInput): Promise<UpdateResult> {
    const total = input.accountStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.accountStatuses) {
      const inputData = input.accountStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const accountStatusData = await this.checkAccountStatusExist(inputData.name)

      if (accountStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.accountStatus.upsert({
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


  async userDeleteAccountStatus(userId: string, accountStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!accountStatusId) {
        throw new BadRequestException('Account Status Id is required')
      } else {

        const caseAccountCount = await this.data.caseAccount.count({ where: { accountStatusId: accountStatusId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }

        await this.data.logEvent(sendingUser, true, 'AccountStatus', 'Delete', accountStatusId)

        let accountStatus = this.data.accountStatus.delete({
          where: { id: accountStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'AccountStatus', 'Delete', accountStatus)

        return accountStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Account Status')
    }
  }
}

