
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCasePreAccidentInput } from './dto/user-create-case-pre-accident.input'
import { UserListCasePreAccidentInput } from './dto/user-list-case-pre-accident.input'
import { UserUpdateCasePreAccidentInput } from './dto/user-update-case-pre-accident.input'
import { UserUpdateCasePreAccidentsInput } from './dto/user-update-case-pre-accidents.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiCasePreAccidentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCasePreAccidents(userId: string, input?: UserListCasePreAccidentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreAccident.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async userSelectCasePreAccidents(userId: string, input?: UserListCasePreAccidentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreAccident.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountCasePreAccidents(userId: string, input?: UserListCasePreAccidentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreAccident.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCasePreAccident(userId: string, casePreAccidentId) {

    return this.data.casePreAccident.findUnique({ where: { id: casePreAccidentId } , include: {legalCase: true}  })
  }

  async checkCasePreAccidentExist(casePreAccidentName: string, legalCaseId:string) {
    try {
      return this.data.casePreAccident.findMany({ where: { name: casePreAccidentName, legalCaseId:legalCaseId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCasePreAccident(userId: string, input: UserCreateCasePreAccidentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const casePreAccidentData = await this.checkCasePreAccidentExist(input.name, input.legalCaseId)

        if (casePreAccidentData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CasePreAccident', 'Create', input)

    let casePreAccident = await this.data.casePreAccident.create({
      data: { 
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
accidentDate: input.accidentDate, 
injuries: input.injuries, 
symptoms: input.symptoms, 
dateCreated: input.dateCreated, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreAccident', 'Create', casePreAccident)

    return casePreAccident

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Pre Accident')
    }

  }


  
  

  async userUpdateCasePreAccident(userId: string, casePreAccidentId: string, input: UserUpdateCasePreAccidentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!casePreAccidentId) {
        throw new BadRequestException('Case Pre Accident Id is required')
      } else {

      const casePreAccidentData = await this.checkCasePreAccidentExist(input.name, input.legalCaseId)

      if (casePreAccidentData.length > 0) {
        if (casePreAccidentData[0].id != casePreAccidentId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CasePreAccident', 'Update', input)

    let casePreAccident = this.data.casePreAccident.update({
      where: { id: casePreAccidentId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
accidentDate: input.accidentDate, 
injuries: input.injuries, 
symptoms: input.symptoms, 
dateCreated: input.dateCreated, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreAccident', 'Update', casePreAccident)

    return casePreAccident

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Pre Accident')
    }
  }

  async userUpdateCasePreAccidents(userId: string, input: UserUpdateCasePreAccidentsInput): Promise<UpdateResult> {
    const total = input.casePreAccidents.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.casePreAccidents) {
      const inputData = input.casePreAccidents[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
legalCaseId: inputData.legalCaseId, 
accidentDate: inputData.accidentDate, 
injuries: inputData.injuries, 
symptoms: inputData.symptoms, 
dateCreated: inputData.dateCreated, 
removed: inputData.removed, 

      }

      const casePreAccidentData = await this.checkCasePreAccidentExist(inputData.name, inputData.legalCaseId)

      if (casePreAccidentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.casePreAccident.upsert({
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


  async userDeleteCasePreAccident(userId: string, casePreAccidentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!casePreAccidentId) {
        throw new BadRequestException('Case Pre Accident Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'CasePreAccident', 'Delete', casePreAccidentId)

        let casePreAccident = this.data.casePreAccident.delete({
          where: { id: casePreAccidentId }
        })

        await this.data.logEvent(sendingUser, false, 'CasePreAccident', 'Delete', casePreAccident)

        return casePreAccident

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Pre Accident')
    }
  }
}

