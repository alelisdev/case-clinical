
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTreatmentInput,
  AdminListTreatmentInput,
  AdminUpdateTreatmentInput,
  ApiTreatmentDataAccessAdminService,
  Treatment
} from '@case-clinical/api/treatment/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTreatmentFeatureAdminResolver {
  constructor(private readonly service: ApiTreatmentDataAccessAdminService) {}

  @Query(() => [Treatment], { nullable: true })
  adminTreatments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTreatmentInput, nullable: true }) input?: AdminListTreatmentInput,
  ) {
    return this.service.adminTreatments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTreatments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTreatmentInput, nullable: true }) input?: AdminListTreatmentInput,
  ) {
    return this.service.adminCountTreatments(admin.id, input)
  }





  @Query(() => Treatment, { nullable: true })
  adminTreatment(@CtxUser() admin: User, @Args('treatmentId') treatmentId: string) {
    return this.service.adminTreatment(admin.id, treatmentId)
  }

  @Mutation(() => Treatment, { nullable: true })
  adminCreateTreatment(@CtxUser() admin: User, @Args('input') input: AdminCreateTreatmentInput,) {
    return this.service.adminCreateTreatment(admin.id, input)
  }

  @Mutation(() => Treatment, { nullable: true })
  adminUpdateTreatment(
    @CtxUser() admin: User,
    @Args('treatmentId') treatmentId: string,
    @Args('input') input: AdminUpdateTreatmentInput,
  ) {
    return this.service.adminUpdateTreatment(admin.id, treatmentId, input)
  }

  @Mutation(() => Treatment, { nullable: true })
  adminDeleteTreatment(@CtxUser() admin: User, @Args('treatmentId') treatmentId: string) {
    return this.service.adminDeleteTreatment(admin.id, treatmentId)
  }
}

