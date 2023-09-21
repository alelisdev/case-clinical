
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateEmailInput } from './dto/admin-create-email.input'
import { AdminListEmailInput } from './dto/admin-list-email.input'

import { AdminUpdateEmailInput } from './dto/admin-update-email.input'

@Injectable()
export class ApiEmailDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminEmails(adminId: string, input?: AdminListEmailInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.email.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { owner: true }
    })
  }

  async adminCountEmails(adminId: string, input?: AdminListEmailInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.email.count(
    {
      where: { 
            name: { 
                contains: input?.name
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

  
  

  async adminEmail(adminId: string, emailId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.email.findUnique({ where: { id: emailId } ,include: { owner: true }})
  }

  async adminCreateEmail(adminId: string, input: AdminCreateEmailInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.email.create({
      data: { 
  
            owner: 
            input.ownerId != null
            ? {
                    connect:  { 
                        id: input.ownerId
                    }
                }: undefined,name: input.name, 
email: input.email, 
isPublic: input.isPublic, 
primary: input.primary, 
verified: input.verified, 
verifyToken: input.verifyToken, 
verifyExpires: input.verifyExpires, 

}
,include: { owner: true }
    })
  }

  async adminUpdateEmail(adminId: string, emailId, input: AdminUpdateEmailInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.email.update({
      where: { id: emailId },
      data: {
      name: input.name,
      email: input.email,
      isPublic: input.isPublic,
      primary: input.primary,
      verified: input.verified,
      verifyToken: input.verifyToken,
      verifyExpires: input.verifyExpires,
      ownerId: input.ownerId
}
,include: { owner: true }
    })
  }

  async adminDeleteEmail(adminId: string, emailId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.email.delete({ where: { id: emailId } })
  }
}

