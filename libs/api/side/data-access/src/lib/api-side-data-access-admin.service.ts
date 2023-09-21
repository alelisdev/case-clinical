
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateSideInput } from './dto/admin-create-side.input'
import { AdminListSideInput } from './dto/admin-list-side.input'

import { AdminUpdateSideInput } from './dto/admin-update-side.input'

@Injectable()
export class ApiSideDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminSides(adminId: string, input?: AdminListSideInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.side.findMany({
      where: {
            name: {
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {whereDoesItHurts: true, }
    })
  }

  async adminCountSides(adminId: string, input?: AdminListSideInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.side.count(
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




  async adminSide(adminId: string, sideId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.side.findUnique({ where: { id: sideId } , include: {whereDoesItHurts: true,} })
  }

  async adminCreateSide(adminId: string, input: AdminCreateSideInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.side.create({
      data: {
name: input.name

}
, include: {whereDoesItHurts: true, }
    })
  }

  async adminUpdateSide(adminId: string, sideId, input: AdminUpdateSideInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.side.update({
      where: { id: sideId },
      data: {
      name: input.name
}
, include: {whereDoesItHurts: true, }
    })
  }

  async adminDeleteSide(adminId: string, sideId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.side.delete({ where: { id: sideId } })
  }
}

