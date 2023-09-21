
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorMedsToDateInput } from './dto/admin-create-prior-meds-to-date.input'
import { AdminListPriorMedsToDateInput } from './dto/admin-list-prior-meds-to-date.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListPriorMedsToDateStatusInput } from '@case-clinical/api/prior-meds-to-date-status/data-access'
import { AdminUpdatePriorMedsToDateInput } from './dto/admin-update-prior-meds-to-date.input'

@Injectable()
export class ApiPriorMedsToDateDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorMedsToDates(adminId: string, input?: AdminListPriorMedsToDateInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDate.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, priorMedsToDateStatus: true}
    })
  }

  async adminCountPriorMedsToDates(adminId: string, input?: AdminListPriorMedsToDateInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorMedsToDate.count(
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

  
  

  async adminPriorMedsToDate(adminId: string, priorMedsToDateId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorMedsToDate.findUnique({ where: { id: priorMedsToDateId } , include: {legalCase: true, priorMedsToDateStatus: true} })
  }

  async checkPriorMedsToDateExist(priorMedsToDateName: string) {
    try {
      return this.data.priorMedsToDate.findMany({ where: { name: priorMedsToDateName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorMedsToDate(adminId: string, input: AdminCreatePriorMedsToDateInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorMedsToDateData = await this.checkPriorMedsToDateExist(input.name)

      if (priorMedsToDateData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorMedsToDate.create({
          data: { 
      
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                priorMedsToDateStatus: 
                input.priorMedsToDateStatusId != null
                ? {
                        connect:  { 
                            id: input.priorMedsToDateStatusId
                        }
                    }: undefined,name: input.name, 
quantity: input.quantity, 
amount: input.amount, 

    }
    , include: {legalCase: true, priorMedsToDateStatus: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorMedsToDate(adminId: string, priorMedsToDateId, input: AdminUpdatePriorMedsToDateInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorMedsToDate.update({
      where: { id: priorMedsToDateId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                priorMedsToDateStatus: 
                input.priorMedsToDateStatusId != null
                ? {
                        connect:  { 
                            id: input.priorMedsToDateStatusId
                        }
                    }: undefined,name: input.name, 
quantity: input.quantity, 
amount: input.amount, 

}
, include: {legalCase: true, priorMedsToDateStatus: true} 
    })
  }

  async adminDeletePriorMedsToDate(adminId: string, priorMedsToDateId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorMedsToDate.delete({ where: { id: priorMedsToDateId } })
  }
}

