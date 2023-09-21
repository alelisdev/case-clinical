
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAttorneyInput } from './dto/user-create-attorney.input'
import { UserListAttorneyInput } from './dto/user-list-attorney.input'
import { UserUpdateAttorneyInput } from './dto/user-update-attorney.input'
import { UserUpdateAttorneysInput } from './dto/user-update-attorneys.input'

import { UserListFirmInput } from '@case-clinical/api/firm/data-access'
import { UserListAttorneyStatusInput } from '@case-clinical/api/attorney-status/data-access'
import { UserListAttorneyTypeInput } from '@case-clinical/api/attorney-type/data-access'

@Injectable()
export class ApiAttorneyDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAttorneys(userId: string, input?: UserListAttorneyInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } });
    console.log(user);
    if(user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      if(attorney) input.firmId = attorney.firmId;
    }
    let name = input?.name ? input.name : undefined

    return this.data.attorney.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmId: input.firmId,
attorneyStatusId: input.attorneyStatusId,
attorneyTypeId: input.attorneyTypeId,}]
          },
      take: input?.limit,
      skip: input?.skip ,
      include: {
        firm: true,
        attorneyStatus: true,
        attorneyType: true,
        legalCases: {
          include:{
            caseProcedures: true,
            patient: true,
            taskItems: true
          }
        }
      }
    })
  }

  async userSelectAttorneys(userId: string, input?: UserListAttorneyInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } });
    if(user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      if(attorney) input.firmId = attorney.firmId;
    }
    let name = input?.name ? input.name : undefined

    return this.data.attorney.findMany({
      where: {
            AND: [{
            name: { contains: name },
            firmId: input.firmId,
attorneyStatusId: input.attorneyStatusId,
attorneyTypeId: input.attorneyTypeId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountAttorneys(userId: string, input?: UserListAttorneyInput): Promise<CorePaging> {
    const user = await this.data.user.findUnique({ where: { id: userId } });
    if(user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      if(attorney) input.firmId = attorney.firmId;
    }
    let name = input?.name ? input.name : undefined

    const total = await this.data.attorney.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            firmId: input.firmId,
attorneyStatusId: input.attorneyStatusId,
attorneyTypeId: input.attorneyTypeId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userAttorney(userId: string, attorneyId) {

    return this.data.attorney.findUnique({ where: { id: attorneyId } , include: {firm: true, attorneyStatus: true, attorneyType: true, legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}, user: true}  })
  }

  async checkAttorneyExist(attorneyName: string, firmId: string) {
    try {
      return this.data.attorney.findMany({ where: { name: attorneyName, firmId: firmId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAttorney(userId: string, input: UserCreateAttorneyInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const attorneyData = await this.checkAttorneyExist(input.name, input.firmId)

        if (attorneyData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Attorney', 'Create', input)

    let attorney = await this.data.attorney.create({
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
                    }: undefined,
                    createdBy:
                    userId != null
                    ? {
                            connect:  {
                                id: userId
                            }
                        }: undefined,

name: input.name,
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

    await this.data.logEvent(sendingUser, false, 'Attorney', 'Create', attorney)

    return attorney

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Attorney')
    }

  }





  async userUpdateAttorney(userId: string, attorneyId: string, input: UserUpdateAttorneyInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!attorneyId) {
        throw new BadRequestException('Attorney Id is required')
      } else {

      const attorneyData = await this.checkAttorneyExist(input.name, input.firmId)

      if (attorneyData.length > 0) {
        if (attorneyData[0].id != attorneyId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Attorney', 'Update', input)

    let attorney = this.data.attorney.update({
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
, include: {firm: true, attorneyStatus: true, attorneyType: true, legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}, user: true}
    })

    await this.data.logEvent(sendingUser, false, 'Attorney', 'Update', attorney)

    return attorney

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Attorney')
    }
  }

  async userUpdateAttorneys(userId: string, input: UserUpdateAttorneysInput): Promise<UpdateResult> {
    const total = input.attorneys.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.attorneys) {
      const inputData = input.attorneys[key]

      const data = {
        id: inputData.id,
name: inputData.name,
firmId: inputData.firm?.id,
attorneyStatusId: inputData.attorneyStatus?.id,
attorneyTypeId: inputData.attorneyType?.id,
title: inputData.title,
firstName: inputData.firstName,
lastName: inputData.lastName,
address: inputData.address,
city: inputData.city,
state: inputData.state,
zip: inputData.zip,
email: inputData.email,
direct: inputData.direct,
fax: inputData.fax,
cellPhone: inputData.cellPhone,
barNumber: inputData.barNumber,
barState: inputData.barState,
doNotDisturb: inputData.doNotDisturb,
temp: inputData.temp,
createdById: inputData.createdById,
dateCreated: inputData.dateCreated,
removed: inputData.removed,
migSource: inputData.migSource,
entity: inputData.entity,
firmNolongerNeeded: inputData.firmNolongerNeeded,
totalSiteCostAllocated: inputData.totalSiteCostAllocated, 
totalSiteCostReturned: inputData.totalSiteCostReturned, 
totalBilledCharges: inputData.totalBilledCharges, 
collectedOfBilled: inputData.collectedOfBilled, 
openCases: inputData.openCases, 
totalCasesReturned: inputData.totalCasesReturned, 
totalCasesWrittenOff: inputData.totalCasesWrittenOff, 

      }

      const attorneyData = await this.checkAttorneyExist(inputData.name, inputData.firmId)

      if (attorneyData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.attorney.upsert({
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


  async userDeleteAttorney(userId: string, attorneyId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!attorneyId) {
        throw new BadRequestException('Attorney Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { attorneyId: attorneyId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Legal Case')
        }

        const userCount = await this.data.user.count({ where: { attorneyId: attorneyId }})
        if(userCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an User')
        }

        await this.data.logEvent(sendingUser, true, 'Attorney', 'Delete', attorneyId)

        let attorney = this.data.attorney.delete({
          where: { id: attorneyId }
        })

        await this.data.logEvent(sendingUser, false, 'Attorney', 'Delete', attorney)

        return attorney

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Attorney')
    }
  }
}

