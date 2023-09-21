
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateRequestAdditionalVisitInput } from './dto/admin-create-request-additional-visit.input'
import { AdminListRequestAdditionalVisitInput } from './dto/admin-list-request-additional-visit.input'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateRequestAdditionalVisitInput } from './dto/admin-update-request-additional-visit.input'

@Injectable()
export class ApiRequestAdditionalVisitDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRequestAdditionalVisits(adminId: string, input?: AdminListRequestAdditionalVisitInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.requestAdditionalVisit.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, legalCase: true}
    })
  }

  async adminCountRequestAdditionalVisits(adminId: string, input?: AdminListRequestAdditionalVisitInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.requestAdditionalVisit.count(
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

  
  

  async adminRequestAdditionalVisit(adminId: string, requestAdditionalVisitId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.requestAdditionalVisit.findUnique({ where: { id: requestAdditionalVisitId } , include: {patient: true, legalCase: true} })
  }

  async checkRequestAdditionalVisitExist(requestAdditionalVisitName: string) {
    try {
      return this.data.requestAdditionalVisit.findMany({ where: { name: requestAdditionalVisitName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRequestAdditionalVisit(adminId: string, input: AdminCreateRequestAdditionalVisitInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const requestAdditionalVisitData = await this.checkRequestAdditionalVisitExist(input.name)

      if (requestAdditionalVisitData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.requestAdditionalVisit.create({
          data: { 
      
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
numberOfVisitsBeingRequested: input.numberOfVisitsBeingRequested, 

    }
    , include: {patient: true, legalCase: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRequestAdditionalVisit(adminId: string, requestAdditionalVisitId, input: AdminUpdateRequestAdditionalVisitInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.requestAdditionalVisit.update({
      where: { id: requestAdditionalVisitId },
      data: {
  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
numberOfVisitsBeingRequested: input.numberOfVisitsBeingRequested, 

}
, include: {patient: true, legalCase: true} 
    })
  }

  async adminDeleteRequestAdditionalVisit(adminId: string, requestAdditionalVisitId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.requestAdditionalVisit.delete({ where: { id: requestAdditionalVisitId } })
  }
}

