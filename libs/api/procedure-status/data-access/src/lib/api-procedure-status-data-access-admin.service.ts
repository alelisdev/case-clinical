
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureStatusInput } from './dto/admin-create-procedure-status.input'
import { AdminListProcedureStatusInput } from './dto/admin-list-procedure-status.input'

import { AdminUpdateProcedureStatusInput } from './dto/admin-update-procedure-status.input'

@Injectable()
export class ApiProcedureStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureStatuses(adminId: string, input?: AdminListProcedureStatusInput) {
    await this.data.ensureAdminUser(adminId)

    const name = input?.name ? input.name : undefined

    return this.data.procedureStatus.findMany({
      where: {
            name: {
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async adminCountProcedureStatuses(adminId: string, input?: AdminListProcedureStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    const name = input?.name ? input.name : undefined

    const total = await this.data.procedureStatus.count(
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




  async adminProcedureStatus(adminId: string, procedureStatusId) {
    await this.data.ensureAdminUser(adminId)
    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureStatus.findUnique({ where: { id: procedureStatusId } , include: {caseProcedures: true} })
  }

  async checkProcedureStatusExist(procedureStatusName: string) {
    try {
      return this.data.procedureStatus.findMany({ where: { name: procedureStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureStatus(adminId: string, input: AdminCreateProcedureStatusInput) {
    await this.data.ensureAdminUser(adminId)

    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureStatusData = await this.checkProcedureStatusExist(input.name)

      if (procedureStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureStatus.create({
          data: {
    name: input.name,

    }
    , include: {caseProcedures: true}
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureStatus(adminId: string, procedureStatusId, input: AdminUpdateProcedureStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureStatus.update({
      where: { id: procedureStatusId },
      data: {
name: input.name,

}
, include: {caseProcedures: true}
    })
  }

  async adminDeleteProcedureStatus(adminId: string, procedureStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureStatus.delete({ where: { id: procedureStatusId } })
  }
}

