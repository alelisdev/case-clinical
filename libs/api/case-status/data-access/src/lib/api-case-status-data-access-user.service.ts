
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCaseStatusInput } from './dto/user-create-case-status.input'
import { UserListCaseStatusInput } from './dto/user-list-case-status.input'
import { UserUpdateCaseStatusInput } from './dto/user-update-case-status.input'
import { UserUpdateCaseStatusesInput } from './dto/user-update-case-statuses.input'



@Injectable()
export class ApiCaseStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCaseStatuses(userId: string, input?: UserListCaseStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectCaseStatuses(userId: string, input?: UserListCaseStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseStatus.findMany({
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

  async userCountCaseStatuses(userId: string, input?: UserListCaseStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseStatus.count(
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

  async userCaseStatus(userId: string, caseStatusId) {

    return this.data.caseStatus.findUnique({ where: { id: caseStatusId } , include: {legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}}  })
  }

  async checkCaseStatusExist(caseStatusName: string) {
    try {
      return this.data.caseStatus.findMany({ where: { name: caseStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCaseStatus(userId: string, input: UserCreateCaseStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const caseStatusData = await this.checkCaseStatusExist(input.name)

        if (caseStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CaseStatus', 'Create', input)

    let caseStatus = await this.data.caseStatus.create({
      data: { 
name: input.name, 
orderIndex: input.orderIndex, 
color: input.color, 
isDefault: input.isDefault, 
tickerDate: input.tickerDate, 
maxTickerDate: input.maxTickerDate, 
moveDocs: input.moveDocs, 
dateCreated: input.dateCreated, 
removed: input.removed, 
createdBy: input.createdBy, 
migSource: input.migSource, 
entity: input.entity, 
temp: input.temp, 

}
, include: {legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseStatus', 'Create', caseStatus)

    return caseStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Status')
    }

  }


  
  

  async userUpdateCaseStatus(userId: string, caseStatusId: string, input: UserUpdateCaseStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!caseStatusId) {
        throw new BadRequestException('Case Status Id is required')
      } else {

      const caseStatusData = await this.checkCaseStatusExist(input.name)

      if (caseStatusData.length > 0) {
        if (caseStatusData[0].id != caseStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CaseStatus', 'Update', input)

    let caseStatus = this.data.caseStatus.update({
      where: { id: caseStatusId },
      data: {
name: input.name, 
orderIndex: input.orderIndex, 
color: input.color, 
isDefault: input.isDefault, 
tickerDate: input.tickerDate, 
maxTickerDate: input.maxTickerDate, 
moveDocs: input.moveDocs, 
dateCreated: input.dateCreated, 
removed: input.removed, 
createdBy: input.createdBy, 
migSource: input.migSource, 
entity: input.entity, 
temp: input.temp, 

}
, include: {legalCases: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseStatus', 'Update', caseStatus)

    return caseStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Status')
    }
  }

  async userUpdateCaseStatuses(userId: string, input: UserUpdateCaseStatusesInput): Promise<UpdateResult> {
    const total = input.caseStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.caseStatuses) {
      const inputData = input.caseStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
orderIndex: inputData.orderIndex, 
color: inputData.color, 
isDefault: inputData.isDefault, 
tickerDate: inputData.tickerDate, 
maxTickerDate: inputData.maxTickerDate, 
moveDocs: inputData.moveDocs, 
dateCreated: inputData.dateCreated, 
removed: inputData.removed, 
createdBy: inputData.createdBy, 
migSource: inputData.migSource, 
entity: inputData.entity, 
temp: inputData.temp, 

      }

      const caseStatusData = await this.checkCaseStatusExist(inputData.name)

      if (caseStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.caseStatus.upsert({
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


  async userDeleteCaseStatus(userId: string, caseStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!caseStatusId) {
        throw new BadRequestException('Case Status Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { caseStatusId: caseStatusId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it has reference at other place')
        }

        await this.data.logEvent(sendingUser, true, 'CaseStatus', 'Delete', caseStatusId)

        let caseStatus = this.data.caseStatus.delete({
          where: { id: caseStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'CaseStatus', 'Delete', caseStatus)

        return caseStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Status')
    }
  }
}

