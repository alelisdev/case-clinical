
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAttorneyTypeInput,
  AdminListAttorneyTypeInput,
  AdminUpdateAttorneyTypeInput,
  ApiAttorneyTypeDataAccessAdminService,
  AttorneyType
} from '@case-clinical/api/attorney-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAttorneyTypeFeatureAdminResolver {
  constructor(private readonly service: ApiAttorneyTypeDataAccessAdminService) {}

  @Query(() => [AttorneyType], { nullable: true })
  adminAttorneyTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAttorneyTypeInput, nullable: true }) input?: AdminListAttorneyTypeInput,
  ) {
    return this.service.adminAttorneyTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAttorneyTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAttorneyTypeInput, nullable: true }) input?: AdminListAttorneyTypeInput,
  ) {
    return this.service.adminCountAttorneyTypes(admin.id, input)
  }





  @Query(() => AttorneyType, { nullable: true })
  adminAttorneyType(@CtxUser() admin: User, @Args('attorneyTypeId') attorneyTypeId: string) {
    return this.service.adminAttorneyType(admin.id, attorneyTypeId)
  }

  @Mutation(() => AttorneyType, { nullable: true })
  adminCreateAttorneyType(@CtxUser() admin: User, @Args('input') input: AdminCreateAttorneyTypeInput,) {
    return this.service.adminCreateAttorneyType(admin.id, input)
  }

  @Mutation(() => AttorneyType, { nullable: true })
  adminUpdateAttorneyType(
    @CtxUser() admin: User,
    @Args('attorneyTypeId') attorneyTypeId: string,
    @Args('input') input: AdminUpdateAttorneyTypeInput,
  ) {
    return this.service.adminUpdateAttorneyType(admin.id, attorneyTypeId, input)
  }

  @Mutation(() => AttorneyType, { nullable: true })
  adminDeleteAttorneyType(@CtxUser() admin: User, @Args('attorneyTypeId') attorneyTypeId: string) {
    return this.service.adminDeleteAttorneyType(admin.id, attorneyTypeId)
  }
}

