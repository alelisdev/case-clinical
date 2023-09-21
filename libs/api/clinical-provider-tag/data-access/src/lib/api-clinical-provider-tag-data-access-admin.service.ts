
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClinicalProviderTagInput } from './dto/admin-create-clinical-provider-tag.input'
import { AdminListClinicalProviderTagInput } from './dto/admin-list-clinical-provider-tag.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListTagInput } from '@case-clinical/api/tag/data-access'
import { AdminUpdateClinicalProviderTagInput } from './dto/admin-update-clinical-provider-tag.input'

@Injectable()
export class ApiClinicalProviderTagDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClinicalProviderTags(adminId: string, input?: AdminListClinicalProviderTagInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderTag.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, tag: true}
    })
  }

  async adminCountClinicalProviderTags(adminId: string, input?: AdminListClinicalProviderTagInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderTag.count(
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

  
  

  async adminClinicalProviderTag(adminId: string, clinicalProviderTagId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.clinicalProviderTag.findUnique({ where: { id: clinicalProviderTagId } , include: {clinicalProvider: true, tag: true} })
  }

  async checkClinicalProviderTagExist(clinicalProviderTagName: string) {
    try {
      return this.data.clinicalProviderTag.findMany({ where: { name: clinicalProviderTagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClinicalProviderTag(adminId: string, input: AdminCreateClinicalProviderTagInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const clinicalProviderTagData = await this.checkClinicalProviderTagExist(input.name)

      if (clinicalProviderTagData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.clinicalProviderTag.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                tag: 
                input.tagId != null
                ? {
                        connect:  { 
                            id: input.tagId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {clinicalProvider: true, tag: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClinicalProviderTag(adminId: string, clinicalProviderTagId, input: AdminUpdateClinicalProviderTagInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderTag.update({
      where: { id: clinicalProviderTagId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                tag: 
                input.tagId != null
                ? {
                        connect:  { 
                            id: input.tagId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true, tag: true} 
    })
  }

  async adminDeleteClinicalProviderTag(adminId: string, clinicalProviderTagId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderTag.delete({ where: { id: clinicalProviderTagId } })
  }
}

