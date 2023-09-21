
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAuthorizationKindInput } from './dto/admin-create-authorization-kind.input'
import { AdminListAuthorizationKindInput } from './dto/admin-list-authorization-kind.input'
import { AdminListCategoryInput } from '@case-clinical/api/category/data-access'
import { AdminUpdateAuthorizationKindInput } from './dto/admin-update-authorization-kind.input'

@Injectable()
export class ApiAuthorizationKindDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAuthorizationKinds(adminId: string, input?: AdminListAuthorizationKindInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.authorizationKind.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {category: true}
    })
  }

  async adminCountAuthorizationKinds(adminId: string, input?: AdminListAuthorizationKindInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationKind.count(
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

  
  

  async adminAuthorizationKind(adminId: string, authorizationKindId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.authorizationKind.findUnique({ where: { id: authorizationKindId } , include: {category: true, priorAuthorizationRequests: true} })
  }

  async checkAuthorizationKindExist(authorizationKindName: string) {
    try {
      return this.data.authorizationKind.findMany({ where: { name: authorizationKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAuthorizationKind(adminId: string, input: AdminCreateAuthorizationKindInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const authorizationKindData = await this.checkAuthorizationKindExist(input.name)

      if (authorizationKindData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.authorizationKind.create({
          data: { 
      
                category: 
                input.categoryId != null
                ? {
                        connect:  { 
                            id: input.categoryId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {category: true, priorAuthorizationRequests: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAuthorizationKind(adminId: string, authorizationKindId, input: AdminUpdateAuthorizationKindInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationKind.update({
      where: { id: authorizationKindId },
      data: {
  
                category: 
                input.categoryId != null
                ? {
                        connect:  { 
                            id: input.categoryId
                        }
                    }: undefined,name: input.name, 

}
, include: {category: true, priorAuthorizationRequests: true} 
    })
  }

  async adminDeleteAuthorizationKind(adminId: string, authorizationKindId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.authorizationKind.delete({ where: { id: authorizationKindId } })
  }
}

