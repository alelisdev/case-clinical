
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCasePreAccidentInput } from './dto/admin-create-case-pre-accident.input'
import { AdminListCasePreAccidentInput } from './dto/admin-list-case-pre-accident.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateCasePreAccidentInput } from './dto/admin-update-case-pre-accident.input'

@Injectable()
export class ApiCasePreAccidentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCasePreAccidents(adminId: string, input?: AdminListCasePreAccidentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.casePreAccident.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async adminCountCasePreAccidents(adminId: string, input?: AdminListCasePreAccidentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreAccident.count(
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

  
  

  async adminCasePreAccident(adminId: string, casePreAccidentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.casePreAccident.findUnique({ where: { id: casePreAccidentId } , include: {legalCase: true} })
  }

  async checkCasePreAccidentExist(casePreAccidentName: string) {
    try {
      return this.data.casePreAccident.findMany({ where: { name: casePreAccidentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCasePreAccident(adminId: string, input: AdminCreateCasePreAccidentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const casePreAccidentData = await this.checkCasePreAccidentExist(input.name)

      if (casePreAccidentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.casePreAccident.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCasePreAccident(adminId: string, casePreAccidentId, input: AdminUpdateCasePreAccidentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreAccident.update({
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
  }

  async adminDeleteCasePreAccident(adminId: string, casePreAccidentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.casePreAccident.delete({ where: { id: casePreAccidentId } })
  }
}

