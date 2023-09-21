
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTagInput,
  AdminListTagInput,
  AdminUpdateTagInput,
  ApiTagDataAccessAdminService,
  Tag
} from '@case-clinical/api/tag/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTagFeatureAdminResolver {
  constructor(private readonly service: ApiTagDataAccessAdminService) {}

  @Query(() => [Tag], { nullable: true })
  adminTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTagInput, nullable: true }) input?: AdminListTagInput,
  ) {
    return this.service.adminTags(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTagInput, nullable: true }) input?: AdminListTagInput,
  ) {
    return this.service.adminCountTags(admin.id, input)
  }





  @Query(() => Tag, { nullable: true })
  adminTag(@CtxUser() admin: User, @Args('tagId') tagId: string) {
    return this.service.adminTag(admin.id, tagId)
  }

  @Mutation(() => Tag, { nullable: true })
  adminCreateTag(@CtxUser() admin: User, @Args('input') input: AdminCreateTagInput,) {
    return this.service.adminCreateTag(admin.id, input)
  }

  @Mutation(() => Tag, { nullable: true })
  adminUpdateTag(
    @CtxUser() admin: User,
    @Args('tagId') tagId: string,
    @Args('input') input: AdminUpdateTagInput,
  ) {
    return this.service.adminUpdateTag(admin.id, tagId, input)
  }

  @Mutation(() => Tag, { nullable: true })
  adminDeleteTag(@CtxUser() admin: User, @Args('tagId') tagId: string) {
    return this.service.adminDeleteTag(admin.id, tagId)
  }
}

