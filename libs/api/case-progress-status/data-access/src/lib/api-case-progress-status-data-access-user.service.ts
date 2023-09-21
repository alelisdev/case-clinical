
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCaseProgressStatusInput } from './dto/user-create-case-progress-status.input'
import { UserListCaseProgressStatusInput } from './dto/user-list-case-progress-status.input'
import { UserUpdateCaseProgressStatusInput } from './dto/user-update-case-progress-status.input'
import { UserUpdateCaseProgressStatusesInput } from './dto/user-update-case-progress-statuses.input'



@Injectable()
export class ApiCaseProgressStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCaseProgressStatuses(userId: string, input?: UserListCaseProgressStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseProgressStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectCaseProgressStatuses(userId: string, input?: UserListCaseProgressStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseProgressStatus.findMany({
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

  async userCountCaseProgressStatuses(userId: string, input?: UserListCaseProgressStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseProgressStatus.count(
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

  async userCaseProgressStatus(userId: string, caseProgressStatusId) {

    return this.data.caseProgressStatus.findUnique({ where: { id: caseProgressStatusId } , include: {legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}}  })
  }

  async checkCaseProgressStatusExist(caseProgressStatusName: string) {
    try {
      return this.data.caseProgressStatus.findMany({ where: { name: caseProgressStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCaseProgressStatus(userId: string, input: UserCreateCaseProgressStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const caseProgressStatusData = await this.checkCaseProgressStatusExist(input.name)

        if (caseProgressStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CaseProgressStatus', 'Create', input)

    let caseProgressStatus = await this.data.caseProgressStatus.create({
      data: { 
name: input.name, 

}
, include: {legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseProgressStatus', 'Create', caseProgressStatus)

    return caseProgressStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Progress Status')
    }

  }


  
  

  async userUpdateCaseProgressStatus(userId: string, caseProgressStatusId: string, input: UserUpdateCaseProgressStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!caseProgressStatusId) {
        throw new BadRequestException('Case Progress Status Id is required')
      } else {

      const caseProgressStatusData = await this.checkCaseProgressStatusExist(input.name)

      if (caseProgressStatusData.length > 0) {
        if (caseProgressStatusData[0].id != caseProgressStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CaseProgressStatus', 'Update', input)

    let caseProgressStatus = this.data.caseProgressStatus.update({
      where: { id: caseProgressStatusId },
      data: {
name: input.name, 

}
, include: {legalCases: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseProgressStatus', 'Update', caseProgressStatus)

    return caseProgressStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Progress Status')
    }
  }

  async userUpdateCaseProgressStatuses(userId: string, input: UserUpdateCaseProgressStatusesInput): Promise<UpdateResult> {
    const total = input.caseProgressStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.caseProgressStatuses) {
      const inputData = input.caseProgressStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const caseProgressStatusData = await this.checkCaseProgressStatusExist(inputData.name)

      if (caseProgressStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.caseProgressStatus.upsert({
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


  async userDeleteCaseProgressStatus(userId: string, caseProgressStatusId: string) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!caseProgressStatusId) {
        throw new BadRequestException('Case Progress Status Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { caseProgressStatusId: caseProgressStatusId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it has reference at other place')
        }

        const caseProgressStatus = this.data.caseProgressStatus.delete({
          where: { id: caseProgressStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'CaseProgressStatus', 'Delete', caseProgressStatus)

        return caseProgressStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Progress Status')
    }
  }
}

