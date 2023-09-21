
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateVisitKindInput } from './dto/admin-create-visit-kind.input'
import { AdminListVisitKindInput } from './dto/admin-list-visit-kind.input'

import { AdminUpdateVisitKindInput } from './dto/admin-update-visit-kind.input'

@Injectable()
export class ApiVisitKindDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminVisitKinds(adminId: string, input?: AdminListVisitKindInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.visitKind.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountVisitKinds(adminId: string, input?: AdminListVisitKindInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.visitKind.count(
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

  
  

  async adminVisitKind(adminId: string, visitKindId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.visitKind.findUnique({ where: { id: visitKindId } , include: {priorAuthorizationRequests: true} })
  }

  async checkVisitKindExist(visitKindName: string) {
    try {
      return this.data.visitKind.findMany({ where: { name: visitKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateVisitKind(adminId: string, input: AdminCreateVisitKindInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const visitKindData = await this.checkVisitKindExist(input.name)

      if (visitKindData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.visitKind.create({
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

  async adminUpdateVisitKind(adminId: string, visitKindId, input: AdminUpdateVisitKindInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.visitKind.update({
      where: { id: visitKindId },
      data: {
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationRequests: true} 
    })
  }

  async adminDeleteVisitKind(adminId: string, visitKindId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.visitKind.delete({ where: { id: visitKindId } })
  }
}

