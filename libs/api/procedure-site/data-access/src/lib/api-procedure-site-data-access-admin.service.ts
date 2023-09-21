
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureSiteInput } from './dto/admin-create-procedure-site.input'
import { AdminListProcedureSiteInput } from './dto/admin-list-procedure-site.input'

import { AdminUpdateProcedureSiteInput } from './dto/admin-update-procedure-site.input'

@Injectable()
export class ApiProcedureSiteDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureSites(adminId: string, input?: AdminListProcedureSiteInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedureSite.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountProcedureSites(adminId: string, input?: AdminListProcedureSiteInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureSite.count(
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

  
  

  async adminProcedureSite(adminId: string, procedureSiteId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureSite.findUnique({ where: { id: procedureSiteId } , include: {priorAuthorizationRequests: true} })
  }

  async checkProcedureSiteExist(procedureSiteName: string) {
    try {
      return this.data.procedureSite.findMany({ where: { name: procedureSiteName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureSite(adminId: string, input: AdminCreateProcedureSiteInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureSiteData = await this.checkProcedureSiteExist(input.name)

      if (procedureSiteData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureSite.create({
          data: { 
    name: input.name, 
code: input.code, 

    }
    , include: {priorAuthorizationRequests: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureSite(adminId: string, procedureSiteId, input: AdminUpdateProcedureSiteInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureSite.update({
      where: { id: procedureSiteId },
      data: {
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationRequests: true} 
    })
  }

  async adminDeleteProcedureSite(adminId: string, procedureSiteId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureSite.delete({ where: { id: procedureSiteId } })
  }
}

