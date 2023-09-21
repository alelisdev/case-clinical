
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContactTagInput } from './dto/admin-create-contact-tag.input'
import { AdminListContactTagInput } from './dto/admin-list-contact-tag.input'
import { AdminListContactInput } from '@case-clinical/api/contact/data-access'
import { AdminUpdateContactTagInput } from './dto/admin-update-contact-tag.input'

@Injectable()
export class ApiContactTagDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContactTags(adminId: string, input?: AdminListContactTagInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contactTag.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true}
    })
  }

  async adminCountContactTags(adminId: string, input?: AdminListContactTagInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactTag.count(
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

  
  

  async adminContactTag(adminId: string, contactTagId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contactTag.findUnique({ where: { id: contactTagId } , include: {contact: true} })
  }

  async checkContactTagExist(contactTagName: string) {
    try {
      return this.data.contactTag.findMany({ where: { name: contactTagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContactTag(adminId: string, input: AdminCreateContactTagInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contactTagData = await this.checkContactTagExist(input.name)

      if (contactTagData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contactTag.create({
          data: { 
      
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {contact: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContactTag(adminId: string, contactTagId, input: AdminUpdateContactTagInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactTag.update({
      where: { id: contactTagId },
      data: {
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,name: input.name, 

}
, include: {contact: true} 
    })
  }

  async adminDeleteContactTag(adminId: string, contactTagId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactTag.delete({ where: { id: contactTagId } })
  }
}

