
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCasePreProcedureInput } from './dto/user-create-case-pre-procedure.input'
import { UserListCasePreProcedureInput } from './dto/user-list-case-pre-procedure.input'
import { UserUpdateCasePreProcedureInput } from './dto/user-update-case-pre-procedure.input'
import { UserUpdateCasePreProceduresInput } from './dto/user-update-case-pre-procedures.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiCasePreProcedureDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCasePreProcedures(userId: string, input?: UserListCasePreProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async userSelectCasePreProcedures(userId: string, input?: UserListCasePreProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProcedure.findMany({
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

  async userCountCasePreProcedures(userId: string, input?: UserListCasePreProcedureInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreProcedure.count(
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

  async userCasePreProcedure(userId: string, casePreProcedureId) {

    return this.data.casePreProcedure.findUnique({ where: { id: casePreProcedureId } , include: {legalCase: true}  })
  }

  async checkCasePreProcedureExist(casePreProcedureName: string, legalCaseId:string) {
    try {
      return this.data.casePreProcedure.findMany({ where: { name: casePreProcedureName, legalCaseId:legalCaseId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCasePreProcedure(userId: string, input: UserCreateCasePreProcedureInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const casePreProcedureData = await this.checkCasePreProcedureExist(input.name, input.legalCaseId)

        if (casePreProcedureData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CasePreProcedure', 'Create', input)

    let casePreProcedure = await this.data.casePreProcedure.create({
      data: { 
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
procedureType: input.procedureType, 
procedureDate: input.procedureDate, 
dateCreated: input.dateCreated, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreProcedure', 'Create', casePreProcedure)

    return casePreProcedure

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Pre Procedure')
    }

  }


  
  

  async userUpdateCasePreProcedure(userId: string, casePreProcedureId: string, input: UserUpdateCasePreProcedureInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!casePreProcedureId) {
        throw new BadRequestException('Case Pre Procedure Id is required')
      } else {

      const casePreProcedureData = await this.checkCasePreProcedureExist(input.name, input.legalCaseId)

      if (casePreProcedureData.length > 0) {
        if (casePreProcedureData[0].id != casePreProcedureId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CasePreProcedure', 'Update', input)

    let casePreProcedure = this.data.casePreProcedure.update({
      where: { id: casePreProcedureId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
procedureType: input.procedureType, 
procedureDate: input.procedureDate, 
dateCreated: input.dateCreated, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreProcedure', 'Update', casePreProcedure)

    return casePreProcedure

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Pre Procedure')
    }
  }

  async userUpdateCasePreProcedures(userId: string, input: UserUpdateCasePreProceduresInput): Promise<UpdateResult> {
    const total = input.casePreProcedures.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.casePreProcedures) {
      const inputData = input.casePreProcedures[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
legalCaseId: inputData.legalCaseId, 
procedureType: inputData.procedureType, 
procedureDate: inputData.procedureDate, 
dateCreated: inputData.dateCreated, 
removed: inputData.removed, 

      }

      const casePreProcedureData = await this.checkCasePreProcedureExist(inputData.name, inputData.legalCaseId)

      if (casePreProcedureData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.casePreProcedure.upsert({
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


  async userDeleteCasePreProcedure(userId: string, casePreProcedureId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!casePreProcedureId) {
        throw new BadRequestException('Case Pre Procedure Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'CasePreProcedure', 'Delete', casePreProcedureId)

        let casePreProcedure = this.data.casePreProcedure.delete({
          where: { id: casePreProcedureId }
        })

        await this.data.logEvent(sendingUser, false, 'CasePreProcedure', 'Delete', casePreProcedure)

        return casePreProcedure

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Pre Procedure')
    }
  }
}

