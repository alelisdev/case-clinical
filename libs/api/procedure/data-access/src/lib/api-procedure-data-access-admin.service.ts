
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureInput } from './dto/admin-create-procedure.input'
import { AdminListProcedureInput } from './dto/admin-list-procedure.input'

import { AdminUpdateProcedureInput } from './dto/admin-update-procedure.input'

@Injectable()
export class ApiProcedureDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedures(adminId: string, input?: AdminListProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedure.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountProcedures(adminId: string, input?: AdminListProcedureInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedure.count(
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

  
  

  async adminProcedure(adminId: string, procedureId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedure.findUnique({ where: { id: procedureId } , include: {priorAuthorizationProcedureCodes: true} })
  }

  async checkProcedureExist(procedureName: string) {
    try {
      return this.data.procedure.findMany({ where: { name: procedureName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedure(adminId: string, input: AdminCreateProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureData = await this.checkProcedureExist(input.name)

      if (procedureData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedure.create({
          data: { 
    name: input.name, 
code: input.code, 

    }
    , include: {priorAuthorizationProcedureCodes: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedure(adminId: string, procedureId, input: AdminUpdateProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedure.update({
      where: { id: procedureId },
      data: {
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationProcedureCodes: true} 
    })
  }

  async adminDeleteProcedure(adminId: string, procedureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedure.delete({ where: { id: procedureId } })
  }
}

