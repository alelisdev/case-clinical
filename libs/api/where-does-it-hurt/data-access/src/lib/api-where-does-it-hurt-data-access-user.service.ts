
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput, } from '@case-clinical/api/core/data-access'
import { UserCreateWhereDoesItHurtInput } from './dto/user-create-where-does-it-hurt.input'
import { UserListWhereDoesItHurtInput } from './dto/user-list-where-does-it-hurt.input'
import { UserUpdateWhereDoesItHurtInput } from './dto/user-update-where-does-it-hurt.input'


@Injectable()
export class ApiWhereDoesItHurtDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) { }

  async userWhereDoesItHurts(userId: string, input?: UserListWhereDoesItHurtInput) {

    return this.data.whereDoesItHurt.findMany({
      where: {
        AND: [{
          name: { contains: input?.name },
          sideId: input?.sideId,
          bodyPartId: input?.bodyPartId,
        }]
      },
      take: input?.limit,
      skip: input?.skip, include: {
        whereDoesItHurtSpecialties: {
          include: {
            specialty: true
          }
        },side: true, bodyPart: true
      }
    })
  }

  async userSelectWhereDoesItHurts(userId: string, input?: UserListWhereDoesItHurtInput) {
    return this.data.whereDoesItHurt.findMany({
      where: {
        name: { contains: input?.name },
      },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountWhereDoesItHurts(userId: string, input?: UserListWhereDoesItHurtInput): Promise<CorePaging> {

    const total = await this.data.whereDoesItHurt.count(
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

  async userWhereDoesItHurt(userId: string, whereDoesItHurtId) {

    return this.data.whereDoesItHurt.findUnique({ where: { id: whereDoesItHurtId }, include: { whereDoesItHurtSpecialties: true, side: true, bodyPart: true } })
  }

  async userCreateWhereDoesItHurt(userId: string, input: UserCreateWhereDoesItHurtInput) {
    try {

      const whereDoesItHurt = await this.data.whereDoesItHurt.create({
        data: {

          side:
            input.sideId != null
              ? {
                connect: {
                  id: input.sideId
                }
              } : undefined,
          bodyPart:
            input.bodyPartId != null
              ? {
                connect: {
                  id: input.bodyPartId
                }
              } : undefined, name: input.name
        }
        , include: { whereDoesItHurtSpecialties: true,  side: true, bodyPart: true }
      })

      return whereDoesItHurt;

    } catch (error) {
      throw new Error("Error while creating Health Insurance data.");
    }
  }




  async userUpdateWhereDoesItHurt(userId: string, whereDoesItHurtId: string, input: UserUpdateWhereDoesItHurtInput) {
    try {
      const whereDoesItHurt = await this.data.whereDoesItHurt.update({
        where: { id: whereDoesItHurtId },
        data: {
          name: input.name,
          sideId: input.sideId,
          bodyPartId: input.bodyPartId
        }
        , include: { whereDoesItHurtSpecialties: true, side: true, bodyPart: true }
      })

      return whereDoesItHurt;

    } catch (error) {
      throw new Error("Error while creating Health Insurance data.");
    }
  }

  async userDeleteWhereDoesItHurt(userId: string, whereDoesItHurtId: string) {
    try {
      const whereDoesItHurt = await this.data.whereDoesItHurt.delete({ where: { id: whereDoesItHurtId } })
      return whereDoesItHurt;

    } catch (error) {
      throw new Error("Error while creating Health Insurance data.");
    }
  }
}

