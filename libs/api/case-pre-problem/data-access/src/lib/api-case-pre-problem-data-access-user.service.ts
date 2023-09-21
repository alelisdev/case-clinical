
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCasePreProblemInput } from './dto/user-create-case-pre-problem.input'
import { UserListCasePreProblemInput } from './dto/user-list-case-pre-problem.input'
import { UserUpdateCasePreProblemInput } from './dto/user-update-case-pre-problem.input'
import { UserUpdateCasePreProblemsInput } from './dto/user-update-case-pre-problems.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiCasePreProblemDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCasePreProblems(userId: string, input?: UserListCasePreProblemInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProblem.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async userSelectCasePreProblems(userId: string, input?: UserListCasePreProblemInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProblem.findMany({
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

  async userCountCasePreProblems(userId: string, input?: UserListCasePreProblemInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreProblem.count(
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

  async userCasePreProblem(userId: string, casePreProblemId) {

    return this.data.casePreProblem.findUnique({ where: { id: casePreProblemId } , include: {legalCase: true}  })
  }

  async checkCasePreProblemExist(casePreProblemName: string, legalCaseId:string) {
    try {
      return this.data.casePreProblem.findMany({ where: { name: casePreProblemName, legalCaseId:legalCaseId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCasePreProblem(userId: string, input: UserCreateCasePreProblemInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const casePreProblemData = await this.checkCasePreProblemExist(input.name, input.legalCaseId)

        if (casePreProblemData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CasePreProblem', 'Create', input)

    let casePreProblem = await this.data.casePreProblem.create({
      data: { 
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
sameRegion: input.sameRegion, 
problemDate: input.problemDate, 
duration: input.duration, 
symptoms: input.symptoms, 
regions: input.regions, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreProblem', 'Create', casePreProblem)

    return casePreProblem

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Pre Problem')
    }

  }


  
  

  async userUpdateCasePreProblem(userId: string, casePreProblemId: string, input: UserUpdateCasePreProblemInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!casePreProblemId) {
        throw new BadRequestException('Case Pre Problem Id is required')
      } else {

      const casePreProblemData = await this.checkCasePreProblemExist(input.name,input.legalCaseId)

      if (casePreProblemData.length > 0) {
        if (casePreProblemData[0].id != casePreProblemId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CasePreProblem', 'Update', input)

    let casePreProblem = this.data.casePreProblem.update({
      where: { id: casePreProblemId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,name: input.name, 
sameRegion: input.sameRegion, 
problemDate: input.problemDate, 
duration: input.duration, 
symptoms: input.symptoms, 
regions: input.regions, 
removed: input.removed, 

}
, include: {legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CasePreProblem', 'Update', casePreProblem)

    return casePreProblem

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Pre Problem')
    }
  }

  async userUpdateCasePreProblems(userId: string, input: UserUpdateCasePreProblemsInput): Promise<UpdateResult> {
    const total = input.casePreProblems.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.casePreProblems) {
      const inputData = input.casePreProblems[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
legalCaseId: inputData.legalCaseId, 
sameRegion: inputData.sameRegion, 
problemDate: inputData.problemDate, 
duration: inputData.duration, 
symptoms: inputData.symptoms, 
regions: inputData.regions, 
removed: inputData.removed, 

      }

      const casePreProblemData = await this.checkCasePreProblemExist(inputData.name, inputData.legalCaseId)

      if (casePreProblemData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.casePreProblem.upsert({
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


  async userDeleteCasePreProblem(userId: string, casePreProblemId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!casePreProblemId) {
        throw new BadRequestException('Case Pre Problem Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'CasePreProblem', 'Delete', casePreProblemId)

        let casePreProblem = this.data.casePreProblem.delete({
          where: { id: casePreProblemId }
        })

        await this.data.logEvent(sendingUser, false, 'CasePreProblem', 'Delete', casePreProblem)

        return casePreProblem

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Pre Problem')
    }
  }
}

