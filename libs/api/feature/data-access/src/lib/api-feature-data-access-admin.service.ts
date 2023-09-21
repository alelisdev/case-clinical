
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateFeatureInput } from './dto/admin-create-feature.input'
import { AdminListFeatureInput } from './dto/admin-list-feature.input'

import { AdminUpdateFeatureInput } from './dto/admin-update-feature.input'

@Injectable()
export class ApiFeatureDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminFeatures(adminId: string, input?: AdminListFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.feature.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountFeatures(adminId: string, input?: AdminListFeatureInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.feature.count(
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

  
  

  async adminFeature(adminId: string, featureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.feature.findUnique({ where: { id: featureId } })
  }

  async adminCreateFeature(adminId: string, input: AdminCreateFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.feature.create({
      data: { 
name: input.name, 

}

    })
  }

  async adminUpdateFeature(adminId: string, featureId, input: AdminUpdateFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.feature.update({
      where: { id: featureId },
      data: {
      name: input.name
}

    })
  }

  async adminDeleteFeature(adminId: string, featureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.feature.delete({ where: { id: featureId } })
  }
}

