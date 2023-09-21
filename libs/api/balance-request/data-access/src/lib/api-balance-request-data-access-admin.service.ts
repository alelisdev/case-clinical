
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateBalanceRequestInput } from './dto/admin-create-balance-request.input'
import { AdminListBalanceRequestInput } from './dto/admin-list-balance-request.input'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateBalanceRequestInput } from './dto/admin-update-balance-request.input'

@Injectable()
export class ApiBalanceRequestDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminBalanceRequests(adminId: string, input?: AdminListBalanceRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.balanceRequest.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {statement: true, legalCase: true}
    })
  }

  async adminCountBalanceRequests(adminId: string, input?: AdminListBalanceRequestInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.balanceRequest.count(
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

  
  

  async adminBalanceRequest(adminId: string, balanceRequestId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.balanceRequest.findUnique({ where: { id: balanceRequestId } , include: {statement: true, legalCase: true} })
  }

  async checkBalanceRequestExist(balanceRequestName: string) {
    try {
      return this.data.balanceRequest.findMany({ where: { name: balanceRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateBalanceRequest(adminId: string, input: AdminCreateBalanceRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const balanceRequestData = await this.checkBalanceRequestExist(input.name)

      if (balanceRequestData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.balanceRequest.create({
          data: { 
      
                statement: 
                input.statementId != null
                ? {
                        connect:  { 
                            id: input.statementId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
requestedOn: input.requestedOn, 
repliedOn: input.repliedOn, 
status: input.status, 
type: input.type, 
balanceAmount: input.balanceAmount, 

    }
    , include: {statement: true, legalCase: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateBalanceRequest(adminId: string, balanceRequestId, input: AdminUpdateBalanceRequestInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.balanceRequest.update({
      where: { id: balanceRequestId },
      data: {
  
                statement: 
                input.statementId != null
                ? {
                        connect:  { 
                            id: input.statementId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
requestedOn: input.requestedOn, 
repliedOn: input.repliedOn, 
status: input.status, 
type: input.type, 
balanceAmount: input.balanceAmount, 

}
, include: {statement: true, legalCase: true} 
    })
  }

  async adminDeleteBalanceRequest(adminId: string, balanceRequestId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.balanceRequest.delete({ where: { id: balanceRequestId } })
  }
}

