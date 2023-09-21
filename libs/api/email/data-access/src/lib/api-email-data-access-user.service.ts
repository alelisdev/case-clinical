import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { UserCreateEmailInput } from './dto/user-create-email.input'
import { UserListEmailInput } from './dto/user-list-email.input'
import { UserUpdateEmailInput } from './dto/user-update-email.input'

@Injectable()
export class ApiEmailDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userEmails(userId: string, input?: UserListEmailInput) {
    return this.data.email.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
            ownerId: input.ownerId,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { owner: true },
    })
  }

  async userCountEmails(userId: string, input?: UserListEmailInput): Promise<CorePaging> {
    const total = await this.data.email.count({
      where: {
        name: {
          contains: input?.name,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userEmail(userId: string, emailId) {
    return this.data.email.findUnique({ where: { id: emailId }, include: { owner: true } })
  }

  async userCreateEmail(userId: string, input: UserCreateEmailInput) {
    return this.data.email.create({
      data: {
        owner:
          input.ownerId != null
            ? {
                connect: {
                  id: input.ownerId,
                },
              }
            : undefined,
        name: input.name,
        email: input.email,
        isPublic: input.isPublic,
        primary: input.primary,
        verified: input.verified,
        verifyToken: input.verifyToken,
        verifyExpires: input.verifyExpires,
      },
      include: { owner: true },
    })
  }

  async userUpdateEmail(userId: string, emailId: string, input: UserUpdateEmailInput) {
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
        ownerId: input.ownerId,
      },
      include: { owner: true },
    })
  }

  async userDeleteEmail(userId: string, emailId: string) {
    return this.data.email.delete({ where: { id: emailId } })
  }

  async userSearchEmails(userId: string, email: string) {
    try {
      const getEmail = await this.data.email.findMany({
        where: {
          email: {
            startsWith: email,
          },
        },
        select: {
          name: true,
          email: true,
        },
      })

      const getContactEmail = await this.data.contactEmail.findMany({
        where: {
          email: {
            contains: email,
          },
        },
        select: {
          name: true,
          email: true,
        },
      })

      let emails = getEmail.concat(getContactEmail)

      // Sort the emails by email
      emails.sort((a, b) => {
        if (a.email < b.email) {
          return -1
        }
        if (a.email > b.email) {
          return 1
        }
        return 0
      })

      return emails
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }
}
