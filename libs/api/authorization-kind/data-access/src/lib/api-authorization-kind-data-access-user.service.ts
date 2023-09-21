import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult } from '@case-clinical/api/core/data-access'
import { UserCreateAuthorizationKindInput } from './dto/user-create-authorization-kind.input'
import { UserListAuthorizationKindInput } from './dto/user-list-authorization-kind.input'
import { UserUpdateAuthorizationKindInput } from './dto/user-update-authorization-kind.input'
import { UserUpdateAuthorizationKindsInput } from './dto/user-update-authorization-kinds.input'

import { UserListCategoryInput } from '@case-clinical/api/category/data-access'

@Injectable()
export class ApiAuthorizationKindDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAuthorizationKinds(userId: string, input?: UserListAuthorizationKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationKind.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            categoryId: input?.categoryId,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { category: true },
    })
  }

  async userSelectAuthorizationKinds(userId: string, input?: UserListAuthorizationKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationKind.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            categoryId: input?.categoryId,
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountAuthorizationKinds(userId: string, input?: UserListAuthorizationKindInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationKind.count({
      where: {
        AND: [
          {
            name: { contains: name },
            categoryId: input?.categoryId,
          },
        ],
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userAuthorizationKind(userId: string, authorizationKindId) {
    return this.data.authorizationKind.findUnique({
      where: { id: authorizationKindId },
      include: { category: true, priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true}} },
    })
  }

  async checkAuthorizationKindExist(authorizationKindName: string) {
    try {
      return this.data.authorizationKind.findMany({ where: { name: authorizationKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAuthorizationKind(userId: string, input: UserCreateAuthorizationKindInput) {
    let sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      const authorizationKindData = await this.checkAuthorizationKindExist(input.name)

      if (authorizationKindData.length > 0) {
        throw new ConflictException('Record must be unique.')
      }

      await this.data.logEvent(sendingUser, true, 'AuthorizationKind', 'Create', input)

      let authorizationKind = await this.data.authorizationKind.create({
        data: {
          category:
            input.categoryId != null
              ? {
                  connect: {
                    id: input.categoryId,
                  },
                }
              : undefined,
          name: input.name,
        },
        include: { category: true, priorAuthorizationRequests: true },
      })

      await this.data.logEvent(sendingUser, false, 'AuthorizationKind', 'Create', authorizationKind)

      return authorizationKind
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Authorization Kind')
    }
  }

  async userUpdateAuthorizationKind(
    userId: string,
    authorizationKindId: string,
    input: UserUpdateAuthorizationKindInput,
  ) {
    let sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      if (!authorizationKindId) {
        throw new BadRequestException('Authorization Kind Id is required')
      } else {
        const authorizationKindData = await this.checkAuthorizationKindExist(input.name)

        if (authorizationKindData.length > 0) {
          if (authorizationKindData[0].id != authorizationKindId) {
            throw new ConflictException('Record must be unique.')
          }
        }

        await this.data.logEvent(sendingUser, true, 'AuthorizationKind', 'Update', input)

        let authorizationKind = this.data.authorizationKind.update({
          where: { id: authorizationKindId },
          data: {
            category:
              input.categoryId != null
                ? {
                    connect: {
                      id: input.categoryId,
                    },
                  }
                : undefined,
            name: input.name,
          },
          include: { category: true, priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true}} },
        })

        await this.data.logEvent(sendingUser, false, 'AuthorizationKind', 'Update', authorizationKind)

        return authorizationKind
      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Authorization Kind')
    }
  }

  async userUpdateAuthorizationKinds(userId: string, input: UserUpdateAuthorizationKindsInput): Promise<UpdateResult> {
    const total = input.authorizationKinds.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.authorizationKinds) {
      const inputData = input.authorizationKinds[key]
      inputData.categoryId = inputData.category?.id
      
      const data = {
        id: inputData.id,
        name: inputData.name,
        categoryId: inputData.categoryId,
      }

      const authorizationKindData = await this.checkAuthorizationKindExist(inputData.name)

      if (authorizationKindData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.authorizationKind.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }

  async userDeleteAuthorizationKind(userId: string, authorizationKindId: string) {
    let sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      if (!authorizationKindId) {
        throw new BadRequestException('Authorization Kind Id is required')
      } else {

        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { authorizationKindId: authorizationKindId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }
 
        await this.data.logEvent(sendingUser, true, 'AuthorizationKind', 'Delete', authorizationKindId)

        let authorizationKind = this.data.authorizationKind.delete({
          where: { id: authorizationKindId },
        })

        await this.data.logEvent(sendingUser, false, 'AuthorizationKind', 'Delete', authorizationKind)

        return authorizationKind
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Error in deleting Authorization Kind')
    }
  }
}
