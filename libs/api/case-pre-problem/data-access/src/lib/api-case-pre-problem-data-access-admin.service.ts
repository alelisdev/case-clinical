
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCasePreProblemInput } from './dto/admin-create-case-pre-problem.input'
import { AdminListCasePreProblemInput } from './dto/admin-list-case-pre-problem.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateCasePreProblemInput } from './dto/admin-update-case-pre-problem.input'

@Injectable()
export class ApiCasePreProblemDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCasePreProblems(adminId: string, input?: AdminListCasePreProblemInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.casePreProblem.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async adminCountCasePreProblems(adminId: string, input?: AdminListCasePreProblemInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreProblem.count(
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

  
  

  async adminCasePreProblem(adminId: string, casePreProblemId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.casePreProblem.findUnique({ where: { id: casePreProblemId } , include: {legalCase: true} })
  }

  async checkCasePreProblemExist(casePreProblemName: string) {
    try {
      return this.data.casePreProblem.findMany({ where: { name: casePreProblemName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCasePreProblem(adminId: string, input: AdminCreateCasePreProblemInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const casePreProblemData = await this.checkCasePreProblemExist(input.name)

      if (casePreProblemData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.casePreProblem.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCasePreProblem(adminId: string, casePreProblemId, input: AdminUpdateCasePreProblemInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreProblem.update({
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
  }

  async adminDeleteCasePreProblem(adminId: string, casePreProblemId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreProblem.delete({ where: { id: casePreProblemId } })
  }
}

