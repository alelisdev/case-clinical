
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAuthorizationTypeInput } from './dto/admin-create-authorization-type.input'
import { AdminListAuthorizationTypeInput } from './dto/admin-list-authorization-type.input'

import { AdminUpdateAuthorizationTypeInput } from './dto/admin-update-authorization-type.input'

@Injectable()
export class ApiAuthorizationTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAuthorizationTypes(adminId: string, input?: AdminListAuthorizationTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.authorizationType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAuthorizationTypes(adminId: string, input?: AdminListAuthorizationTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationType.count(
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

  
  

  async adminAuthorizationType(adminId: string, authorizationTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.authorizationType.findUnique({ where: { id: authorizationTypeId } , include: {authorizations: true} })
  }

  async checkAuthorizationTypeExist(authorizationTypeName: string) {
    try {
      return this.data.authorizationType.findMany({ where: { name: authorizationTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAuthorizationType(adminId: string, input: AdminCreateAuthorizationTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const authorizationTypeData = await this.checkAuthorizationTypeExist(input.name)

      if (authorizationTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.authorizationType.create({
          data: { 
    name: input.name, 

    }
    , include: {authorizations: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAuthorizationType(adminId: string, authorizationTypeId, input: AdminUpdateAuthorizationTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationType.update({
      where: { id: authorizationTypeId },
      data: {
name: input.name, 

}
, include: {authorizations: true} 
    })
  }

  async adminDeleteAuthorizationType(adminId: string, authorizationTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationType.delete({ where: { id: authorizationTypeId } })
  }
}

