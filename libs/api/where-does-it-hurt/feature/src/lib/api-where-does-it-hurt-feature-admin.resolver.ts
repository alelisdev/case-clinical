
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateWhereDoesItHurtInput,
  AdminListWhereDoesItHurtInput,
  AdminUpdateWhereDoesItHurtInput,
  ApiWhereDoesItHurtDataAccessAdminService,
  WhereDoesItHurt
} from '@case-clinical/api/where-does-it-hurt/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiWhereDoesItHurtFeatureAdminResolver {
  constructor(private readonly service: ApiWhereDoesItHurtDataAccessAdminService) {}

  @Query(() => [WhereDoesItHurt], { nullable: true })
  adminWhereDoesItHurts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWhereDoesItHurtInput, nullable: true }) input?: AdminListWhereDoesItHurtInput,
  ) {
    return this.service.adminWhereDoesItHurts(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountWhereDoesItHurts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWhereDoesItHurtInput, nullable: true }) input?: AdminListWhereDoesItHurtInput,
  ) {
    return this.service.adminCountWhereDoesItHurts(admin.id, input)
  }





  @Query(() => WhereDoesItHurt, { nullable: true })
  adminWhereDoesItHurt(@CtxUser() admin: User, @Args('whereDoesItHurtId') whereDoesItHurtId: string) {
    return this.service.adminWhereDoesItHurt(admin.id, whereDoesItHurtId)
  }

  @Mutation(() => WhereDoesItHurt, { nullable: true })
  adminCreateWhereDoesItHurt(@CtxUser() admin: User, @Args('input') input: AdminCreateWhereDoesItHurtInput,) {
    return this.service.adminCreateWhereDoesItHurt(admin.id, input)
  }

  @Mutation(() => WhereDoesItHurt, { nullable: true })
  adminUpdateWhereDoesItHurt(
    @CtxUser() admin: User,
    @Args('whereDoesItHurtId') whereDoesItHurtId: string,
    @Args('input') input: AdminUpdateWhereDoesItHurtInput,
  ) {
    return this.service.adminUpdateWhereDoesItHurt(admin.id, whereDoesItHurtId, input)
  }

  @Mutation(() => WhereDoesItHurt, { nullable: true })
  adminDeleteWhereDoesItHurt(@CtxUser() admin: User, @Args('whereDoesItHurtId') whereDoesItHurtId: string) {
    return this.service.adminDeleteWhereDoesItHurt(admin.id, whereDoesItHurtId)
  }
}

