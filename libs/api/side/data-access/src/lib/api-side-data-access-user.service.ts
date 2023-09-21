import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { UserCreateSideInput } from './dto/user-create-side.input'
import { UserListSideInput } from './dto/user-list-side.input'
import { UserUpdateSideInput } from './dto/user-update-side.input'

@Injectable()
export class ApiSideDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userSides(userId: string, input?: UserListSideInput) {
    try {
      return this.data.side.findMany({
        orderBy: {
          name: 'asc',
        },
        where: {
          AND: [
            {
              name: { contains: input?.name },
            },
          ],
        },
        take: input?.limit,
        skip: input?.skip,
        include: { whereDoesItHurts: true, },
      })
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }

  async userSelectSides(userId: string, input?: UserListSideInput) {
    try {
      return this.data.side.findMany({
        where: {
          name: { contains: input?.name },
        },
        select: {
          id: true,
          name: true,
        },
        take: input?.limit,
        skip: input?.skip,
      })
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }

  async userCountSides(userId: string, input?: UserListSideInput): Promise<CorePaging> {
    try {
      const total = await this.data.side.count({
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
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }

  async userSide(userId: string, sideId) {
    try {
      return this.data.side.findUnique({
        where: { id: sideId },
        include: { whereDoesItHurts: true, },
      })
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }

  async userCreateSide(userId: string, input: UserCreateSideInput) {
    try {
      await this.validateSide(input)

      return this.data.side.create({
        data: {
          name: input.name,
        },
        include: { whereDoesItHurts: true,  },
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }

  async userUpdateSide(userId: string, sideId: string, input: UserUpdateSideInput) {
    try {
      await this.validateSide(input, sideId)
      return this.data.side.update({
        where: { id: sideId },
        data: {
          name: input.name,
        },
        include: { whereDoesItHurts: true, },
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }

  async userDeleteSide(userId: string, sideId: string) {
    try {
      const side = await this.data.side.findUnique({
        where: { id: sideId },
        include: {
          whereDoesItHurts: true,
        },
      })

      if (
        side?.whereDoesItHurts?.length > 0
      ) {
        throw new BadRequestException('Record cannot be deleted because it has reference at other place.')
      }
      return this.data.side.delete({ where: { id: sideId } })
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Something went wrong.Please Try Again.')
    }
  }

  async validateSide(input, sideId = null) {
    const side = await this.data.side.findFirst({
      where: {
        name: {
          equals: input?.name?.trim(),
        },
      },
    })

    if (side?.id) {
      if (sideId) {
        if (sideId !== side?.id) {
          throw new BadRequestException('Record must be unique')
        }
        return true
      }
      throw new BadRequestException('Record must be unique')
    }
    return true
  }
}
