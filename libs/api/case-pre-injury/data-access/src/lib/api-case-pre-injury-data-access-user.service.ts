
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCasePreInjuryInput } from './dto/user-create-case-pre-injury.input'
import { UserListCasePreInjuryInput } from './dto/user-list-case-pre-injury.input'
import { UserUpdateCasePreInjuryInput } from './dto/user-update-case-pre-injury.input'
import { UserUpdateCasePreInjuriesInput } from './dto/user-update-case-pre-injuries.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiCasePreInjuryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCasePreInjuries(userId: string, input?: UserListCasePreInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreInjury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async userSelectCasePreInjuries(userId: string, input?: UserListCasePreInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreInjury.findMany({
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

  async userCountCasePreInjuries(userId: string, input?: UserListCasePreInjuryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreInjury.count(
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

  async userCasePreInjury(userId: string, casePreInjuryId) {

    return this.data.casePreInjury.findUnique({ where: { id: casePreInjuryId } , include: {legalCase: true}  })
  }

  async checkCasePreInjuryExist(casePreInjuryName: string, legalCaseId:string) {
    try {
      return this.data.casePreInjury.findMany({ where: { name: casePreInjuryName, legalCaseId:legalCaseId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCasePreInjury(userId: string, input: UserCreateCasePreInjuryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const casePreInjuryData = await this.checkCasePreInjuryExist(input.name, input.legalCaseId)

        if (casePreInjuryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CasePreInjury', 'Create', input)

    let casePreInjury = await this.data.casePreInjury.create({
      data: { 
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
affectsInjury: input.affectsInjury, 
injuryDate: input.injuryDate, 
injured: input.injured, 
anatomic: input.anatomic, 
dateCreated: input.dateCreated, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreInjury', 'Create', casePreInjury)

    return casePreInjury

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Pre Injury')
    }

  }


  
  

  async userUpdateCasePreInjury(userId: string, casePreInjuryId: string, input: UserUpdateCasePreInjuryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!casePreInjuryId) {
        throw new BadRequestException('Case Pre Injury Id is required')
      } else {

      const casePreInjuryData = await this.checkCasePreInjuryExist(input.name, input.legalCaseId)

      if (casePreInjuryData.length > 0) {
        if (casePreInjuryData[0].id != casePreInjuryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CasePreInjury', 'Update', input)

    let casePreInjury = this.data.casePreInjury.update({
      where: { id: casePreInjuryId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
affectsInjury: input.affectsInjury, 
injuryDate: input.injuryDate, 
injured: input.injured, 
anatomic: input.anatomic, 
dateCreated: input.dateCreated, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreInjury', 'Update', casePreInjury)

    return casePreInjury

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Pre Injury')
    }
  }

  async userUpdateCasePreInjuries(userId: string, input: UserUpdateCasePreInjuriesInput): Promise<UpdateResult> {
    const total = input.casePreInjuries.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.casePreInjuries) {
      const inputData = input.casePreInjuries[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
legalCaseId: inputData.legalCaseId, 
affectsInjury: inputData.affectsInjury, 
injuryDate: inputData.injuryDate, 
injured: inputData.injured, 
anatomic: inputData.anatomic, 
dateCreated: inputData.dateCreated, 
removed: inputData.removed, 

      }

      const casePreInjuryData = await this.checkCasePreInjuryExist(inputData.name, inputData.legalCaseId)

      if (casePreInjuryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.casePreInjury.upsert({
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


  async userDeleteCasePreInjury(userId: string, casePreInjuryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!casePreInjuryId) {
        throw new BadRequestException('Case Pre Injury Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'CasePreInjury', 'Delete', casePreInjuryId)

        let casePreInjury = this.data.casePreInjury.delete({
          where: { id: casePreInjuryId }
        })

        await this.data.logEvent(sendingUser, false, 'CasePreInjury', 'Delete', casePreInjury)

        return casePreInjury

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Pre Injury')
    }
  }
}

