import { AdminCreateRoleFeatureInput } from './dto/admin-create-role-feature.input'
import { AdminListRoleFeatureInput } from './dto/admin-list-role-feature.input'
import { AdminUpdateRoleFeatureInput } from './dto/admin-update-role-feature.input'
import { ApiCoreDataAccessService, CorePaging } from '@case-clinical/api/core/data-access'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class ApiRoleFeatureDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRoleFeatures(adminId: string, input?: AdminListRoleFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.roleFeature.findMany({
      take: input?.limit,
      skip: input?.skip,
      include: { feature: true, role: true },
    })
  }

  async adminCountRoleFeatures(adminId: string, input?: AdminListRoleFeatureInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.roleFeature.count({

    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async adminRoleFeature(adminId: string, roleFeatureId) {
    await this.data.ensureAdminUser(adminId)
    return this.data.roleFeature.findUnique({ where: { id: roleFeatureId }, include: { feature: true, role: true } })
  }

  async adminCreateRoleFeature(adminId: string, input: AdminCreateRoleFeatureInput) {
    await this.data.ensureAdminUser(adminId)
    const roleFeature = await this.data.roleFeature.findFirst({
      where: {
        AND: {
          featureId: input.featureId,
          roleId: input.roleId
        }
      }
    })
    if(roleFeature) {
      throw new BadRequestException(
        {
          msg: 'Duplicate role feature creation'
        }
      );
    }
    return this.data.roleFeature.create({
      data: {
        feature:
          input.featureId != null
            ? {
                connect: {
                  id: input.featureId,
                },
              }
            : undefined,
        role:
          input.roleId != null
            ? {
                connect: {
                  id: input.roleId,
                },
              }
            : undefined,
      },
      include: { feature: true, role: true },
    })
  }

  async adminUpdateRoleFeature(adminId: string, roleFeatureId, input: AdminUpdateRoleFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.roleFeature.update({
      where: { id: roleFeatureId },
      data: {
        featureId: input.featureId,
        roleId: input.roleId,
      },
      include: { feature: true, role: true },
    })
  }

  async adminDeleteRoleFeature(adminId: string, roleFeatureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.roleFeature.delete({ where: { id: roleFeatureId } })
  }
}
