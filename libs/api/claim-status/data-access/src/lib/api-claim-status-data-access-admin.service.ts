
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClaimStatusInput } from './dto/admin-create-claim-status.input'
import { AdminListClaimStatusInput } from './dto/admin-list-claim-status.input'

import { AdminUpdateClaimStatusInput } from './dto/admin-update-claim-status.input'

@Injectable()
export class ApiClaimStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClaimStatuses(adminId: string, input?: AdminListClaimStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.claimStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountClaimStatuses(adminId: string, input?: AdminListClaimStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.claimStatus.count(
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

  
  

  async adminClaimStatus(adminId: string, claimStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.claimStatus.findUnique({ where: { id: claimStatusId } , include: {claimProcedures: true} })
  }

  async checkClaimStatusExist(claimStatusName: string) {
    try {
      return this.data.claimStatus.findMany({ where: { name: claimStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClaimStatus(adminId: string, input: AdminCreateClaimStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const claimStatusData = await this.checkClaimStatusExist(input.name)

      if (claimStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.claimStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {claimProcedures: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClaimStatus(adminId: string, claimStatusId, input: AdminUpdateClaimStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.claimStatus.update({
      where: { id: claimStatusId },
      data: {
name: input.name, 

}
, include: {claimProcedures: true} 
    })
  }

  async adminDeleteClaimStatus(adminId: string, claimStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.claimStatus.delete({ where: { id: claimStatusId } })
  }
}

