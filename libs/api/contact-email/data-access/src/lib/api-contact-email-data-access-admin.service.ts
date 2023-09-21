
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContactEmailInput } from './dto/admin-create-contact-email.input'
import { AdminListContactEmailInput } from './dto/admin-list-contact-email.input'
import { AdminListContactInput } from '@case-clinical/api/contact/data-access'
import { AdminUpdateContactEmailInput } from './dto/admin-update-contact-email.input'

@Injectable()
export class ApiContactEmailDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContactEmails(adminId: string, input?: AdminListContactEmailInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contactEmail.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true}
    })
  }

  async adminCountContactEmails(adminId: string, input?: AdminListContactEmailInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactEmail.count(
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

  
  

  async adminContactEmail(adminId: string, contactEmailId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contactEmail.findUnique({ where: { id: contactEmailId } , include: {contact: true} })
  }

  async checkContactEmailExist(contactEmailName: string) {
    try {
      return this.data.contactEmail.findMany({ where: { name: contactEmailName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContactEmail(adminId: string, input: AdminCreateContactEmailInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contactEmailData = await this.checkContactEmailExist(input.name)

      if (contactEmailData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contactEmail.create({
          data: { 
      
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,email: input.email, 
name: input.name, 

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

  async adminUpdateContactEmail(adminId: string, contactEmailId, input: AdminUpdateContactEmailInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactEmail.update({
      where: { id: contactEmailId },
      data: {
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,email: input.email, 
name: input.name, 

}
, include: {contact: true} 
    })
  }

  async adminDeleteContactEmail(adminId: string, contactEmailId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactEmail.delete({ where: { id: contactEmailId } })
  }
}

