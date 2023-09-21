
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateWhereDoesItHurtInput } from './dto/admin-create-where-does-it-hurt.input'
import { AdminListWhereDoesItHurtInput } from './dto/admin-list-where-does-it-hurt.input'

import { AdminUpdateWhereDoesItHurtInput } from './dto/admin-update-where-does-it-hurt.input'

@Injectable()
export class ApiWhereDoesItHurtDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminWhereDoesItHurts(adminId: string, input?: AdminListWhereDoesItHurtInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurt.findMany({
      where: {
            name: {
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {whereDoesItHurtSpecialties: true, side: true, bodyPart: true}
    })
  }

  async adminCountWhereDoesItHurts(adminId: string, input?: AdminListWhereDoesItHurtInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

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




  async adminWhereDoesItHurt(adminId: string, whereDoesItHurtId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurt.findUnique({ where: { id: whereDoesItHurtId } , include: {whereDoesItHurtSpecialties: true, side: true, bodyPart: true} })
  }

  async adminCreateWhereDoesItHurt(adminId: string, input: AdminCreateWhereDoesItHurtInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurt.create({
      data: {

                side:
                input.sideId != null
                ? {
                        connect:  {
                            id: input.sideId
                        }
                    }: undefined,
                bodyPart:
                input.bodyPartId != null
                ? {
                        connect:  {
                            id: input.bodyPartId
                        }
                    }: undefined,name: input.name

}
, include: {whereDoesItHurtSpecialties: true, side: true, bodyPart: true}
    })
  }

  async adminUpdateWhereDoesItHurt(adminId: string, whereDoesItHurtId, input: AdminUpdateWhereDoesItHurtInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurt.update({
      where: { id: whereDoesItHurtId },
      data: {
      name: input.name,
      sideId: input.sideId,
      bodyPartId: input.bodyPartId
}
, include: {whereDoesItHurtSpecialties: true, side: true, bodyPart: true}
    })
  }

  async adminDeleteWhereDoesItHurt(adminId: string, whereDoesItHurtId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurt.delete({ where: { id: whereDoesItHurtId } })
  }
}

