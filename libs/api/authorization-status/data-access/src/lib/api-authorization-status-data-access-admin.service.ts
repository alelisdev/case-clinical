
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAuthorizationStatusInput } from './dto/admin-create-authorization-status.input'
import { AdminListAuthorizationStatusInput } from './dto/admin-list-authorization-status.input'

import { AdminUpdateAuthorizationStatusInput } from './dto/admin-update-authorization-status.input'

@Injectable()
export class ApiAuthorizationStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAuthorizationStatuses(adminId: string, input?: AdminListAuthorizationStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.authorizationStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAuthorizationStatuses(adminId: string, input?: AdminListAuthorizationStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationStatus.count(
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

  
  

  async adminAuthorizationStatus(adminId: string, authorizationStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.authorizationStatus.findUnique({ where: { id: authorizationStatusId } , include: {priorAuthorizationRequests: true} })
  }

  async checkAuthorizationStatusExist(authorizationStatusName: string) {
    try {
      return this.data.authorizationStatus.findMany({ where: { name: authorizationStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAuthorizationStatus(adminId: string, input: AdminCreateAuthorizationStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const authorizationStatusData = await this.checkAuthorizationStatusExist(input.name)

      if (authorizationStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.authorizationStatus.create({
          data: { 
    name: input.name, 

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

  async adminUpdateAuthorizationStatus(adminId: string, authorizationStatusId, input: AdminUpdateAuthorizationStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationStatus.update({
      where: { id: authorizationStatusId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationRequests: true} 
    })
  }

  async adminDeleteAuthorizationStatus(adminId: string, authorizationStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationStatus.delete({ where: { id: authorizationStatusId } })
  }
}

