
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateTagInput } from './dto/admin-create-tag.input'
import { AdminListTagInput } from './dto/admin-list-tag.input'

import { AdminUpdateTagInput } from './dto/admin-update-tag.input'

@Injectable()
export class ApiTagDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTags(adminId: string, input?: AdminListTagInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.tag.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountTags(adminId: string, input?: AdminListTagInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.tag.count(
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

  
  

  async adminTag(adminId: string, tagId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.tag.findUnique({ where: { id: tagId } , include: {clinicalProviderTags: true, taskTags: true} })
  }

  async checkTagExist(tagName: string) {
    try {
      return this.data.tag.findMany({ where: { name: tagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateTag(adminId: string, input: AdminCreateTagInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const tagData = await this.checkTagExist(input.name)

      if (tagData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.tag.create({
          data: { 
    name: input.name, 

    }
    , include: {clinicalProviderTags: true, taskTags: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateTag(adminId: string, tagId, input: AdminUpdateTagInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.tag.update({
      where: { id: tagId },
      data: {
name: input.name, 

}
, include: {clinicalProviderTags: true, taskTags: true} 
    })
  }

  async adminDeleteTag(adminId: string, tagId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.tag.delete({ where: { id: tagId } })
  }
}

