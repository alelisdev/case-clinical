
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureTypeInput } from './dto/admin-create-procedure-type.input'
import { AdminListProcedureTypeInput } from './dto/admin-list-procedure-type.input'

import { AdminUpdateProcedureTypeInput } from './dto/admin-update-procedure-type.input'

@Injectable()
export class ApiProcedureTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureTypes(adminId: string, input?: AdminListProcedureTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedureType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountProcedureTypes(adminId: string, input?: AdminListProcedureTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureType.count(
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

  
  

  async adminProcedureType(adminId: string, procedureTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureType.findUnique({ where: { id: procedureTypeId } , include: {caseAccounts: true} })
  }

  async checkProcedureTypeExist(procedureTypeName: string) {
    try {
      return this.data.procedureType.findMany({ where: { name: procedureTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureType(adminId: string, input: AdminCreateProcedureTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureTypeData = await this.checkProcedureTypeExist(input.name)

      if (procedureTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureType.create({
          data: { 
    name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
isSystem: input.isSystem, 
removed: input.removed, 
modality: input.modality, 

    }
    , include: {caseAccounts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureType(adminId: string, procedureTypeId, input: AdminUpdateProcedureTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureType.update({
      where: { id: procedureTypeId },
      data: {
name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
isSystem: input.isSystem, 
removed: input.removed, 
modality: input.modality, 

}
, include: {caseAccounts: true} 
    })
  }

  async adminDeleteProcedureType(adminId: string, procedureTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureType.delete({ where: { id: procedureTypeId } })
  }
}

