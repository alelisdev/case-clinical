
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCasePreInjuryInput } from './dto/admin-create-case-pre-injury.input'
import { AdminListCasePreInjuryInput } from './dto/admin-list-case-pre-injury.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateCasePreInjuryInput } from './dto/admin-update-case-pre-injury.input'

@Injectable()
export class ApiCasePreInjuryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCasePreInjuries(adminId: string, input?: AdminListCasePreInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.casePreInjury.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async adminCountCasePreInjuries(adminId: string, input?: AdminListCasePreInjuryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreInjury.count(
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

  
  

  async adminCasePreInjury(adminId: string, casePreInjuryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.casePreInjury.findUnique({ where: { id: casePreInjuryId } , include: {legalCase: true} })
  }

  async checkCasePreInjuryExist(casePreInjuryName: string) {
    try {
      return this.data.casePreInjury.findMany({ where: { name: casePreInjuryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCasePreInjury(adminId: string, input: AdminCreateCasePreInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const casePreInjuryData = await this.checkCasePreInjuryExist(input.name)

      if (casePreInjuryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.casePreInjury.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCasePreInjury(adminId: string, casePreInjuryId, input: AdminUpdateCasePreInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreInjury.update({
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
  }

  async adminDeleteCasePreInjury(adminId: string, casePreInjuryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreInjury.delete({ where: { id: casePreInjuryId } })
  }
}

