
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAwardInput } from './dto/admin-create-award.input'
import { AdminListAwardInput } from './dto/admin-list-award.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateAwardInput } from './dto/admin-update-award.input'

@Injectable()
export class ApiAwardDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAwards(adminId: string, input?: AdminListAwardInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.award.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountAwards(adminId: string, input?: AdminListAwardInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.award.count(
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

  
  

  async adminAward(adminId: string, awardId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.award.findUnique({ where: { id: awardId } , include: {clinicalProvider: true} })
  }

  async checkAwardExist(awardName: string) {
    try {
      return this.data.award.findMany({ where: { name: awardName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAward(adminId: string, input: AdminCreateAwardInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const awardData = await this.checkAwardExist(input.name)

      if (awardData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.award.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
awardedAt: input.awardedAt, 
note: input.note, 

    }
    , include: {clinicalProvider: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAward(adminId: string, awardId, input: AdminUpdateAwardInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.award.update({
      where: { id: awardId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
awardedAt: input.awardedAt, 
note: input.note, 

}
, include: {clinicalProvider: true} 
    })
  }

  async adminDeleteAward(adminId: string, awardId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.award.delete({ where: { id: awardId } })
  }
}

