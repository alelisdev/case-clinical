import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult } from '@case-clinical/api/core/data-access'
import { UserCreateBalanceRequestInput } from './dto/user-create-balance-request.input'
import { UserListBalanceRequestInput } from './dto/user-list-balance-request.input'
import { UserUpdateBalanceRequestInput } from './dto/user-update-balance-request.input'
import { UserUpdateBalanceRequestsInput } from './dto/user-update-balance-requests.input'

import { UserListDocumentInput } from '@case-clinical/api/document/data-access'
import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiBalanceRequestDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBalanceRequests(userId: string, input?: UserListBalanceRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.balanceRequest.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { legalCase: true },
    })
  }

  async userSelectBalanceRequests(userId: string, input?: UserListBalanceRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.balanceRequest.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            statementId: input?.statementId,
            legalCaseId: input?.legalCaseId,
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountBalanceRequests(userId: string, input?: UserListBalanceRequestInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.balanceRequest.count({
      where: {
        AND: [
          {
            name: { contains: name },
            statementId: input?.statementId,
            legalCaseId: input?.legalCaseId,
          },
        ],
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userBalanceRequest(userId: string, balanceRequestId) {
    return this.data.balanceRequest.findUnique({
      where: { id: balanceRequestId },
      include: { statement: true, legalCase: true },
    })
  }

  async checkBalanceRequestExist(balanceRequestName: string) {
    try {
      return this.data.balanceRequest.findMany({ where: { name: balanceRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateBalanceRequest(userId: string, input: UserCreateBalanceRequestInput) {
    let sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      const balanceRequestData = await this.checkBalanceRequestExist(input.name)

      if (balanceRequestData.length > 0) {
        throw new ConflictException('Record must be unique.')
      }

      if (input.statement) {
        let statementId = (await this.data.userCreateDocument(userId, input.statement)).id
        if (statementId) {
          input.statementId = statementId
        }
      }

      await this.data.logEvent(sendingUser, true, 'BalanceRequest', 'Create', input)

      let balanceRequest = await this.data.balanceRequest.create({
        data: {
          statement:
            input.statementId != null
              ? {
                  connect: {
                    id: input.statementId,
                  },
                }
              : undefined,
          legalCase:
            input.legalCaseId != null
              ? {
                  connect: {
                    id: input.legalCaseId,
                  },
                }
              : undefined,
          name: input.name,
          requestedOn: input.requestedOn,
          repliedOn: input.repliedOn,
          status: input.status,
          type: input.type,
          balanceAmount: input.balanceAmount,
        },
        include: { statement: true, legalCase: true },
      })

      await this.data.logEvent(sendingUser, false, 'BalanceRequest', 'Create', balanceRequest)

      return balanceRequest
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Balance Request')
    }
  }

  async userUpdateBalanceRequest(userId: string, balanceRequestId: string, input: UserUpdateBalanceRequestInput) {
    let sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      if (!balanceRequestId) {
        throw new BadRequestException('Balance Request Id is required')
      } else {
        const balanceRequestData = await this.checkBalanceRequestExist(input.name)

        if (balanceRequestData.length > 0) {
          if (balanceRequestData[0].id != balanceRequestId) {
            throw new ConflictException('Record must be unique.')
          }
        }

        if (input.statement) {
          let statementId = (await this.data.userCreateDocument(userId, input.statement)).id
          if (statementId) {
            input.statementId = statementId
          }
        }

        await this.data.logEvent(sendingUser, true, 'BalanceRequest', 'Update', input)

        let balanceRequest = this.data.balanceRequest.update({
          where: { id: balanceRequestId },
          data: {
            statement:
              input.statementId != null
                ? {
                    connect: {
                      id: input.statementId,
                    },
                  }
                : undefined,
            legalCase:
              input.legalCaseId != null
                ? {
                    connect: {
                      id: input.legalCaseId,
                    },
                  }
                : undefined,
            name: input.name,
            requestedOn: input.requestedOn,
            repliedOn: input.repliedOn,
            status: input.status,
            type: input.type,
            balanceAmount: input.balanceAmount,
          },
          include: { statement: true, legalCase: true },
        })

        await this.data.logEvent(sendingUser, false, 'BalanceRequest', 'Update', balanceRequest)

        return balanceRequest
      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Balance Request')
    }
  }

  async userUpdateBalanceRequests(userId: string, input: UserUpdateBalanceRequestsInput): Promise<UpdateResult> {
    const total = input.balanceRequests.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.balanceRequests) {
      const inputData = input.balanceRequests[key]

      const data = {
        id: inputData.id,
        name: inputData.name,
        requestedOn: inputData.requestedOn,
        repliedOn: inputData.repliedOn,
        status: inputData.status,
        statementId: inputData.statementId,
        type: inputData.type,
        balanceAmount: inputData.balanceAmount,
        legalCaseId: inputData.legalCaseId,
      }

      const balanceRequestData = await this.checkBalanceRequestExist(inputData.name)

      if (balanceRequestData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.balanceRequest.upsert({
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

  async userDeleteBalanceRequest(userId: string, balanceRequestId: string) {
    let sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      if (!balanceRequestId) {
        throw new BadRequestException('Balance Request Id is required')
      } else {
        await this.data.logEvent(sendingUser, true, 'BalanceRequest', 'Delete', balanceRequestId)

        let balanceRequest = this.data.balanceRequest.delete({
          where: { id: balanceRequestId },
        })

        await this.data.logEvent(sendingUser, false, 'BalanceRequest', 'Delete', balanceRequest)

        return balanceRequest
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }

      throw new InternalServerErrorException('Error in deleting Balance Request')
    }
  }
}
