
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAccidentTypeInput,
  AdminListAccidentTypeInput,
  AdminUpdateAccidentTypeInput,
  ApiAccidentTypeDataAccessAdminService,
  AccidentType
} from '@case-clinical/api/accident-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAccidentTypeFeatureAdminResolver {
  constructor(private readonly service: ApiAccidentTypeDataAccessAdminService) {}

  @Query(() => [AccidentType], { nullable: true })
  adminAccidentTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAccidentTypeInput, nullable: true }) input?: AdminListAccidentTypeInput,
  ) {
    return this.service.adminAccidentTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAccidentTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAccidentTypeInput, nullable: true }) input?: AdminListAccidentTypeInput,
  ) {
    return this.service.adminCountAccidentTypes(admin.id, input)
  }





  @Query(() => AccidentType, { nullable: true })
  adminAccidentType(@CtxUser() admin: User, @Args('accidentTypeId') accidentTypeId: string) {
    return this.service.adminAccidentType(admin.id, accidentTypeId)
  }

  @Mutation(() => AccidentType, { nullable: true })
  adminCreateAccidentType(@CtxUser() admin: User, @Args('input') input: AdminCreateAccidentTypeInput,) {
    return this.service.adminCreateAccidentType(admin.id, input)
  }

  @Mutation(() => AccidentType, { nullable: true })
  adminUpdateAccidentType(
    @CtxUser() admin: User,
    @Args('accidentTypeId') accidentTypeId: string,
    @Args('input') input: AdminUpdateAccidentTypeInput,
  ) {
    return this.service.adminUpdateAccidentType(admin.id, accidentTypeId, input)
  }

  @Mutation(() => AccidentType, { nullable: true })
  adminDeleteAccidentType(@CtxUser() admin: User, @Args('accidentTypeId') accidentTypeId: string) {
    return this.service.adminDeleteAccidentType(admin.id, accidentTypeId)
  }
}

