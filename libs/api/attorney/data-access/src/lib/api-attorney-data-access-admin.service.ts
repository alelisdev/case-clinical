
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAttorneyInput } from './dto/admin-create-attorney.input'
import { AdminListAttorneyInput } from './dto/admin-list-attorney.input'
import { AdminListFirmInput } from '@case-clinical/api/firm/data-access'
import { AdminListAttorneyStatusInput } from '@case-clinical/api/attorney-status/data-access'
import { AdminListAttorneyTypeInput } from '@case-clinical/api/attorney-type/data-access'
import { AdminUpdateAttorneyInput } from './dto/admin-update-attorney.input'

@Injectable()
export class ApiAttorneyDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAttorneys(adminId: string, input?: AdminListAttorneyInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.attorney.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {firm: true, attorneyStatus: true, attorneyType: true}
    })
  }

  async adminCountAttorneys(adminId: string, input?: AdminListAttorneyInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.attorney.count(
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

  
  

  async adminAttorney(adminId: string, attorneyId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.attorney.findUnique({ where: { id: attorneyId } , include: {firm: true, attorneyStatus: true, attorneyType: true, legalCases: true, user: true} })
  }

  async checkAttorneyExist(attorneyName: string) {
    try {
      return this.data.attorney.findMany({ where: { name: attorneyName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAttorney(adminId: string, input: AdminCreateAttorneyInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const attorneyData = await this.checkAttorneyExist(input.name)

      if (attorneyData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.attorney.create({
          data: { 
      
                firm: 
                input.firmId != null
                ? {
                        connect:  { 
                            id: input.firmId
                        }
                    }: undefined,  
                attorneyStatus: 
                input.attorneyStatusId != null
                ? {
                        connect:  { 
                            id: input.attorneyStatusId
                        }
                    }: undefined,  
                attorneyType: 
                input.attorneyTypeId != null
                ? {
                        connect:  { 
                            id: input.attorneyTypeId
                        }
                    }: undefined,name: input.name, 
title: input.title, 
firstName: input.firstName, 
lastName: input.lastName, 
address: input.address, 
city: input.city, 
state: input.state, 
zip: input.zip, 
email: input.email, 
direct: input.direct, 
fax: input.fax, 
cellPhone: input.cellPhone, 
barNumber: input.barNumber, 
barState: input.barState, 
doNotDisturb: input.doNotDisturb, 
temp: input.temp, 
dateCreated: input.dateCreated, 
removed: input.removed, 
migSource: input.migSource, 
entity: input.entity, 
firmNolongerNeeded: input.firmNolongerNeeded, 
totalSiteCostAllocated: input.totalSiteCostAllocated, 
totalSiteCostReturned: input.totalSiteCostReturned, 
totalBilledCharges: input.totalBilledCharges, 
collectedOfBilled: input.collectedOfBilled, 
openCases: input.openCases, 
totalCasesReturned: input.totalCasesReturned, 
totalCasesWrittenOff: input.totalCasesWrittenOff, 

    }
    , include: {firm: true, attorneyStatus: true, attorneyType: true, legalCases: true, user: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAttorney(adminId: string, attorneyId, input: AdminUpdateAttorneyInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.attorney.update({
      where: { id: attorneyId },
      data: {
  
                firm: 
                input.firmId != null
                ? {
                        connect:  { 
                            id: input.firmId
                        }
                    }: undefined,  
                attorneyStatus: 
                input.attorneyStatusId != null
                ? {
                        connect:  { 
                            id: input.attorneyStatusId
                        }
                    }: undefined,  
                attorneyType: 
                input.attorneyTypeId != null
                ? {
                        connect:  { 
                            id: input.attorneyTypeId
                        }
                    }: undefined,name: input.name, 
title: input.title, 
firstName: input.firstName, 
lastName: input.lastName, 
address: input.address, 
city: input.city, 
state: input.state, 
zip: input.zip, 
email: input.email, 
direct: input.direct, 
fax: input.fax, 
cellPhone: input.cellPhone, 
barNumber: input.barNumber, 
barState: input.barState, 
doNotDisturb: input.doNotDisturb, 
temp: input.temp, 
dateCreated: input.dateCreated, 
removed: input.removed, 
migSource: input.migSource, 
entity: input.entity, 
firmNolongerNeeded: input.firmNolongerNeeded, 
totalSiteCostAllocated: input.totalSiteCostAllocated, 
totalSiteCostReturned: input.totalSiteCostReturned, 
totalBilledCharges: input.totalBilledCharges, 
collectedOfBilled: input.collectedOfBilled, 
openCases: input.openCases, 
totalCasesReturned: input.totalCasesReturned, 
totalCasesWrittenOff: input.totalCasesWrittenOff, 

}
, include: {firm: true, attorneyStatus: true, attorneyType: true, legalCases: true, user: true} 
    })
  }

  async adminDeleteAttorney(adminId: string, attorneyId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.attorney.delete({ where: { id: attorneyId } })
  }
}

