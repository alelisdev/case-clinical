
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateMedicalConditionInput,
  AdminListMedicalConditionInput,
  AdminUpdateMedicalConditionInput,
  ApiMedicalConditionDataAccessAdminService,
  MedicalCondition
} from '@case-clinical/api/medical-condition/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiMedicalConditionFeatureAdminResolver {
  constructor(private readonly service: ApiMedicalConditionDataAccessAdminService) {}

  @Query(() => [MedicalCondition], { nullable: true })
  adminMedicalConditions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalConditionInput, nullable: true }) input?: AdminListMedicalConditionInput,
  ) {
    return this.service.adminMedicalConditions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountMedicalConditions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalConditionInput, nullable: true }) input?: AdminListMedicalConditionInput,
  ) {
    return this.service.adminCountMedicalConditions(admin.id, input)
  }





  @Query(() => MedicalCondition, { nullable: true })
  adminMedicalCondition(@CtxUser() admin: User, @Args('medicalConditionId') medicalConditionId: string) {
    return this.service.adminMedicalCondition(admin.id, medicalConditionId)
  }

  @Mutation(() => MedicalCondition, { nullable: true })
  adminCreateMedicalCondition(@CtxUser() admin: User, @Args('input') input: AdminCreateMedicalConditionInput,) {
    return this.service.adminCreateMedicalCondition(admin.id, input)
  }

  @Mutation(() => MedicalCondition, { nullable: true })
  adminUpdateMedicalCondition(
    @CtxUser() admin: User,
    @Args('medicalConditionId') medicalConditionId: string,
    @Args('input') input: AdminUpdateMedicalConditionInput,
  ) {
    return this.service.adminUpdateMedicalCondition(admin.id, medicalConditionId, input)
  }

  @Mutation(() => MedicalCondition, { nullable: true })
  adminDeleteMedicalCondition(@CtxUser() admin: User, @Args('medicalConditionId') medicalConditionId: string) {
    return this.service.adminDeleteMedicalCondition(admin.id, medicalConditionId)
  }
}

