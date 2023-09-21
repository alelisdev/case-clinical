
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateGenderInput,
  AdminListGenderInput,
  AdminUpdateGenderInput,
  ApiGenderDataAccessAdminService,
  Gender
} from '@case-clinical/api/gender/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiGenderFeatureAdminResolver {
  constructor(private readonly service: ApiGenderDataAccessAdminService) {}

  @Query(() => [Gender], { nullable: true })
  adminGenders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListGenderInput, nullable: true }) input?: AdminListGenderInput,
  ) {
    return this.service.adminGenders(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountGenders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListGenderInput, nullable: true }) input?: AdminListGenderInput,
  ) {
    return this.service.adminCountGenders(admin.id, input)
  }





  @Query(() => Gender, { nullable: true })
  adminGender(@CtxUser() admin: User, @Args('genderId') genderId: string) {
    return this.service.adminGender(admin.id, genderId)
  }

  @Mutation(() => Gender, { nullable: true })
  adminCreateGender(@CtxUser() admin: User, @Args('input') input: AdminCreateGenderInput,) {
    return this.service.adminCreateGender(admin.id, input)
  }

  @Mutation(() => Gender, { nullable: true })
  adminUpdateGender(
    @CtxUser() admin: User,
    @Args('genderId') genderId: string,
    @Args('input') input: AdminUpdateGenderInput,
  ) {
    return this.service.adminUpdateGender(admin.id, genderId, input)
  }

  @Mutation(() => Gender, { nullable: true })
  adminDeleteGender(@CtxUser() admin: User, @Args('genderId') genderId: string) {
    return this.service.adminDeleteGender(admin.id, genderId)
  }
}

