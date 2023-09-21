
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateRequiredFieldInput } from './dto/admin-create-required-field.input'
import { AdminListRequiredFieldInput } from './dto/admin-list-required-field.input'
import { AdminListAccidentTypeInput } from '@case-clinical/api/accident-type/data-access'
import { AdminListMedLevelInput } from '@case-clinical/api/med-level/data-access'
import { AdminUpdateRequiredFieldInput } from './dto/admin-update-required-field.input'

@Injectable()
export class ApiRequiredFieldDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRequiredFields(adminId: string, input?: AdminListRequiredFieldInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.requiredField.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {accidentType: true, medLevel: true}
    })
  }

  async adminCountRequiredFields(adminId: string, input?: AdminListRequiredFieldInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.requiredField.count(
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

  
  

  async adminRequiredField(adminId: string, requiredFieldId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.requiredField.findUnique({ where: { id: requiredFieldId } , include: {accidentType: true, medLevel: true} })
  }

  async checkRequiredFieldExist(requiredFieldName: string) {
    try {
      return this.data.requiredField.findMany({ where: { name: requiredFieldName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRequiredField(adminId: string, input: AdminCreateRequiredFieldInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const requiredFieldData = await this.checkRequiredFieldExist(input.name)

      if (requiredFieldData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.requiredField.create({
          data: { 
      
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                medLevel: 
                input.medLevelId != null
                ? {
                        connect:  { 
                            id: input.medLevelId
                        }
                    }: undefined,name: input.name, 
entityName: input.entityName, 

    }
    , include: {accidentType: true, medLevel: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRequiredField(adminId: string, requiredFieldId, input: AdminUpdateRequiredFieldInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.requiredField.update({
      where: { id: requiredFieldId },
      data: {
  
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                medLevel: 
                input.medLevelId != null
                ? {
                        connect:  { 
                            id: input.medLevelId
                        }
                    }: undefined,name: input.name, 
entityName: input.entityName, 

}
, include: {accidentType: true, medLevel: true} 
    })
  }

  async adminDeleteRequiredField(adminId: string, requiredFieldId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.requiredField.delete({ where: { id: requiredFieldId } })
  }
}

