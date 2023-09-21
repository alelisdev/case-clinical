
import { Injectable, BadRequestException } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateFeatureInput } from './dto/user-create-feature.input'
import { UserListFeatureInput } from './dto/user-list-feature.input'
import { UserUpdateFeatureInput } from './dto/user-update-feature.input'


@Injectable()
export class ApiFeatureDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userFeatures(userId: string, input?: UserListFeatureInput) {
    console.log(input.limit)
    return this.data.feature.findMany({
      where: {
        AND: [{
          name: { contains: input?.name },
        }]
      },
      include: {
        featurePermissions: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userSelectFeatures(userId: string, input?: UserListFeatureInput) {
    return this.data.feature.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountFeatures(userId: string, input?: UserListFeatureInput): Promise<CorePaging> {

    const total = await this.data.feature.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userFeature(userId: string, featureId) {

    return this.data.feature.findUnique({ where: { id: featureId }  })
  }

  async userCreateFeature(userId: string, input: UserCreateFeatureInput) {

    return this.data.feature.create({
      data: {
name: input.name,

}

    })
  }




  async userUpdateFeature(userId: string, featureId: string, input: UserUpdateFeatureInput) {

    return this.data.feature.update({
      where: { id: featureId },
      data: {
      name: input.name
}

    })
  }

  async userDeleteFeature(userId: string, featureId: string) {
    
    const featurePermissionCount = await this.data.featurePermission.count({ where: { featureId: featureId }})
    if(featurePermissionCount > 0) {
      throw new BadRequestException('Record cannot be deleted because it is referenced on a Feature Permission')
    }


    const userFeatureCount = await this.data.userFeature.count({ where: { featureId: featureId }})
    if(userFeatureCount > 0) {
      throw new BadRequestException('Record cannot be deleted because it is referenced on an User Feature')
    }


    return this.data.feature.delete({ where: { id: featureId } })
  }
}

