
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateInjuryInput } from './dto/admin-create-injury.input'
import { AdminListInjuryInput } from './dto/admin-list-injury.input'

import { AdminUpdateInjuryInput } from './dto/admin-update-injury.input'

@Injectable()
export class ApiInjuryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminInjuries(adminId: string, input?: AdminListInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.injury.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountInjuries(adminId: string, input?: AdminListInjuryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.injury.count(
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

  
  

  async adminInjury(adminId: string, injuryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.injury.findUnique({ where: { id: injuryId } , include: {leads: true} })
  }

  async checkInjuryExist(injuryName: string) {
    try {
      return this.data.injury.findMany({ where: { name: injuryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateInjury(adminId: string, input: AdminCreateInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const injuryData = await this.checkInjuryExist(input.name)

      if (injuryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.injury.create({
          data: { 
    name: input.name,

    }
    , include: {leads: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateInjury(adminId: string, injuryId, input: AdminUpdateInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.injury.update({
      where: { id: injuryId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })
  }

  async adminDeleteInjury(adminId: string, injuryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.injury.delete({ where: { id: injuryId } })
  }
}

