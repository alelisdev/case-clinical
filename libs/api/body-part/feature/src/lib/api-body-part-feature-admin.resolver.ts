
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateBodyPartInput,
  AdminListBodyPartInput,
  AdminUpdateBodyPartInput,
  ApiBodyPartDataAccessAdminService,
  BodyPart
} from '@case-clinical/api/body-part/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiBodyPartFeatureAdminResolver {
  constructor(private readonly service: ApiBodyPartDataAccessAdminService) {}

  @Query(() => [BodyPart], { nullable: true })
  adminBodyParts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBodyPartInput, nullable: true }) input?: AdminListBodyPartInput,
  ) {
    return this.service.adminBodyParts(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountBodyParts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBodyPartInput, nullable: true }) input?: AdminListBodyPartInput,
  ) {
    return this.service.adminCountBodyParts(admin.id, input)
  }





  @Query(() => BodyPart, { nullable: true })
  adminBodyPart(@CtxUser() admin: User, @Args('bodyPartId') bodyPartId: string) {
    return this.service.adminBodyPart(admin.id, bodyPartId)
  }

  @Mutation(() => BodyPart, { nullable: true })
  adminCreateBodyPart(@CtxUser() admin: User, @Args('input') input: AdminCreateBodyPartInput,) {
    return this.service.adminCreateBodyPart(admin.id, input)
  }

  @Mutation(() => BodyPart, { nullable: true })
  adminUpdateBodyPart(
    @CtxUser() admin: User,
    @Args('bodyPartId') bodyPartId: string,
    @Args('input') input: AdminUpdateBodyPartInput,
  ) {
    return this.service.adminUpdateBodyPart(admin.id, bodyPartId, input)
  }

  @Mutation(() => BodyPart, { nullable: true })
  adminDeleteBodyPart(@CtxUser() admin: User, @Args('bodyPartId') bodyPartId: string) {
    return this.service.adminDeleteBodyPart(admin.id, bodyPartId)
  }
}

