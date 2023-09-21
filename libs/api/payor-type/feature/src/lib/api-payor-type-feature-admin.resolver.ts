
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePayorTypeInput,
  AdminListPayorTypeInput,
  AdminUpdatePayorTypeInput,
  ApiPayorTypeDataAccessAdminService,
  PayorType
} from '@case-clinical/api/payor-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPayorTypeFeatureAdminResolver {
  constructor(private readonly service: ApiPayorTypeDataAccessAdminService) {}

  @Query(() => [PayorType], { nullable: true })
  adminPayorTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPayorTypeInput, nullable: true }) input?: AdminListPayorTypeInput,
  ) {
    return this.service.adminPayorTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPayorTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPayorTypeInput, nullable: true }) input?: AdminListPayorTypeInput,
  ) {
    return this.service.adminCountPayorTypes(admin.id, input)
  }





  @Query(() => PayorType, { nullable: true })
  adminPayorType(@CtxUser() admin: User, @Args('payorTypeId') payorTypeId: string) {
    return this.service.adminPayorType(admin.id, payorTypeId)
  }

  @Mutation(() => PayorType, { nullable: true })
  adminCreatePayorType(@CtxUser() admin: User, @Args('input') input: AdminCreatePayorTypeInput,) {
    return this.service.adminCreatePayorType(admin.id, input)
  }

  @Mutation(() => PayorType, { nullable: true })
  adminUpdatePayorType(
    @CtxUser() admin: User,
    @Args('payorTypeId') payorTypeId: string,
    @Args('input') input: AdminUpdatePayorTypeInput,
  ) {
    return this.service.adminUpdatePayorType(admin.id, payorTypeId, input)
  }

  @Mutation(() => PayorType, { nullable: true })
  adminDeletePayorType(@CtxUser() admin: User, @Args('payorTypeId') payorTypeId: string) {
    return this.service.adminDeletePayorType(admin.id, payorTypeId)
  }
}

