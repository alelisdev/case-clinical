
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRequiredFieldInput,
  AdminListRequiredFieldInput,
  AdminUpdateRequiredFieldInput,
  ApiRequiredFieldDataAccessAdminService,
  RequiredField
} from '@case-clinical/api/required-field/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListAccidentTypeInput, AccidentType } from '@case-clinical/api/accident-type/data-access'
import { AdminListMedLevelInput, MedLevel } from '@case-clinical/api/med-level/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRequiredFieldFeatureAdminResolver {
  constructor(private readonly service: ApiRequiredFieldDataAccessAdminService) {}

  @Query(() => [RequiredField], { nullable: true })
  adminRequiredFields(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRequiredFieldInput, nullable: true }) input?: AdminListRequiredFieldInput,
  ) {
    return this.service.adminRequiredFields(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRequiredFields(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRequiredFieldInput, nullable: true }) input?: AdminListRequiredFieldInput,
  ) {
    return this.service.adminCountRequiredFields(admin.id, input)
  }





  @Query(() => RequiredField, { nullable: true })
  adminRequiredField(@CtxUser() admin: User, @Args('requiredFieldId') requiredFieldId: string) {
    return this.service.adminRequiredField(admin.id, requiredFieldId)
  }

  @Mutation(() => RequiredField, { nullable: true })
  adminCreateRequiredField(@CtxUser() admin: User, @Args('input') input: AdminCreateRequiredFieldInput,) {
    return this.service.adminCreateRequiredField(admin.id, input)
  }

  @Mutation(() => RequiredField, { nullable: true })
  adminUpdateRequiredField(
    @CtxUser() admin: User,
    @Args('requiredFieldId') requiredFieldId: string,
    @Args('input') input: AdminUpdateRequiredFieldInput,
  ) {
    return this.service.adminUpdateRequiredField(admin.id, requiredFieldId, input)
  }

  @Mutation(() => RequiredField, { nullable: true })
  adminDeleteRequiredField(@CtxUser() admin: User, @Args('requiredFieldId') requiredFieldId: string) {
    return this.service.adminDeleteRequiredField(admin.id, requiredFieldId)
  }
}

