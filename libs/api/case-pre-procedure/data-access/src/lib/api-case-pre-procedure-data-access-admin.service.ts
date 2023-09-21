
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCasePreProcedureInput } from './dto/admin-create-case-pre-procedure.input'
import { AdminListCasePreProcedureInput } from './dto/admin-list-case-pre-procedure.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateCasePreProcedureInput } from './dto/admin-update-case-pre-procedure.input'

@Injectable()
export class ApiCasePreProcedureDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCasePreProcedures(adminId: string, input?: AdminListCasePreProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.casePreProcedure.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async adminCountCasePreProcedures(adminId: string, input?: AdminListCasePreProcedureInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreProcedure.count(
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

  
  

  async adminCasePreProcedure(adminId: string, casePreProcedureId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.casePreProcedure.findUnique({ where: { id: casePreProcedureId } , include: {legalCase: true} })
  }

  async checkCasePreProcedureExist(casePreProcedureName: string) {
    try {
      return this.data.casePreProcedure.findMany({ where: { name: casePreProcedureName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCasePreProcedure(adminId: string, input: AdminCreateCasePreProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const casePreProcedureData = await this.checkCasePreProcedureExist(input.name)

      if (casePreProcedureData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.casePreProcedure.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCasePreProcedure(adminId: string, casePreProcedureId, input: AdminUpdateCasePreProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreProcedure.update({
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
  }

  async adminDeleteCasePreProcedure(adminId: string, casePreProcedureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreProcedure.delete({ where: { id: casePreProcedureId } })
  }
}

