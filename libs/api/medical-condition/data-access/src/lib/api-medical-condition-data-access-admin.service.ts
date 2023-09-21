
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateMedicalConditionInput } from './dto/admin-create-medical-condition.input'
import { AdminListMedicalConditionInput } from './dto/admin-list-medical-condition.input'

import { AdminUpdateMedicalConditionInput } from './dto/admin-update-medical-condition.input'

@Injectable()
export class ApiMedicalConditionDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminMedicalConditions(adminId: string, input?: AdminListMedicalConditionInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.medicalCondition.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountMedicalConditions(adminId: string, input?: AdminListMedicalConditionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalCondition.count(
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

  
  

  async adminMedicalCondition(adminId: string, medicalConditionId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.medicalCondition.findUnique({ where: { id: medicalConditionId } })
  }

  async checkMedicalConditionExist(medicalConditionName: string) {
    try {
      return this.data.medicalCondition.findMany({ where: { name: medicalConditionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateMedicalCondition(adminId: string, input: AdminCreateMedicalConditionInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const medicalConditionData = await this.checkMedicalConditionExist(input.name)

      if (medicalConditionData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.medicalCondition.create({
          data: { 
    name: input.name, 

    }
    
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateMedicalCondition(adminId: string, medicalConditionId, input: AdminUpdateMedicalConditionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalCondition.update({
      where: { id: medicalConditionId },
      data: {
name: input.name, 

}

    })
  }

  async adminDeleteMedicalCondition(adminId: string, medicalConditionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalCondition.delete({ where: { id: medicalConditionId } })
  }
}

