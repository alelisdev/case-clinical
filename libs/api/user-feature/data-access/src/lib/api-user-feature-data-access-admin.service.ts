
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateUserFeatureInput } from './dto/admin-create-user-feature.input'
import { AdminListUserFeatureInput } from './dto/admin-list-user-feature.input'
import { AdminListFeatureInput } from '@case-clinical/api/feature/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateUserFeatureInput } from './dto/admin-update-user-feature.input'

@Injectable()
export class ApiUserFeatureDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminUserFeatures(adminId: string, input?: AdminListUserFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeature.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { feature: true, user: true }
    })
  }

  async adminCountUserFeatures(adminId: string, input?: AdminListUserFeatureInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.userFeature.count(
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

  
  

  async adminUserFeature(adminId: string, userFeatureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeature.findUnique({ where: { id: userFeatureId } ,include: { feature: true, user: true }})
  }

  async adminCreateUserFeature(adminId: string, input: AdminCreateUserFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeature.create({
      data: { 
  
                feature: 
                input.featureId != null
                ? {
                        connect:  { 
                            id: input.featureId
                        }
                    }: undefined,  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,name: input.name, 

}
,include: { feature: true, user: true }
    })
  }

  async adminUpdateUserFeature(adminId: string, userFeatureId, input: AdminUpdateUserFeatureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeature.update({
      where: { id: userFeatureId },
      data: {
      name: input.name,
      featureId: input.featureId,
      userId: input.userId
}
,include: { feature: true, user: true }
    })
  }

  async adminDeleteUserFeature(adminId: string, userFeatureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userFeature.delete({ where: { id: userFeatureId } })
  }
}

