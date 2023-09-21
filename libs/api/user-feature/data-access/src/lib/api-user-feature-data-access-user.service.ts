
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateUserFeatureInput } from './dto/user-create-user-feature.input'
import { UserListUserFeatureInput } from './dto/user-list-user-feature.input'
import { UserUpdateUserFeatureInput } from './dto/user-update-user-feature.input'
import { UserListFeatureInput } from '@case-clinical/api/feature/data-access'
import { UserListUserInput } from '@case-clinical/api/user/data-access'

@Injectable()
export class ApiUserFeatureDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userUserFeatures(userId: string, input?: UserListUserFeatureInput) {

    return this.data.userFeature.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            featureId: input?.featureId ? input.featureId : undefined,
userId: input?.userId ? input.userId : undefined,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { feature: true, user: true }
    })
  }

  async userSelectUserFeatures(userId: string, input?: UserListUserFeatureInput) {
    return this.data.userFeature.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            featureId: input?.featureId ? input.featureId : undefined,
userId: input?.userId ? input.userId : undefined,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountUserFeatures(userId: string, input?: UserListUserFeatureInput): Promise<CorePaging> {

    const total = await this.data.userFeature.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
            featureId: input?.featureId ? input.featureId : undefined,
            userId: input?.userId ? input.userId : undefined,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUserFeature(userId: string, userFeatureId) {

    return this.data.userFeature.findUnique({ where: { id: userFeatureId } ,include: { feature: true, user: true } })
  }

  async userCreateUserFeature(userId: string, input: UserCreateUserFeatureInput) {

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

  
  

  async userUpdateUserFeature(userId: string, userFeatureId: string, input: UserUpdateUserFeatureInput) {

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

  async userDeleteUserFeature(userId: string, userFeatureId: string) {
    return this.data.userFeature.delete({ where: { id: userFeatureId } })
  }

  async userUpdateUserFeatures(userId: string, userFeatures: UserUpdateUserFeatureInput[]) {
    await this.data.userFeature.updateMany({
      where: { userId: userId },
      data: userFeatures
  })
  }
}

