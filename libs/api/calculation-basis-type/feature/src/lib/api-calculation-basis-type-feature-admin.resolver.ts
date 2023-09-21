
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCalculationBasisTypeInput,
  AdminListCalculationBasisTypeInput,
  AdminUpdateCalculationBasisTypeInput,
  ApiCalculationBasisTypeDataAccessAdminService,
  CalculationBasisType
} from '@case-clinical/api/calculation-basis-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCalculationBasisTypeFeatureAdminResolver {
  constructor(private readonly service: ApiCalculationBasisTypeDataAccessAdminService) {}

  @Query(() => [CalculationBasisType], { nullable: true })
  adminCalculationBasisTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCalculationBasisTypeInput, nullable: true }) input?: AdminListCalculationBasisTypeInput,
  ) {
    return this.service.adminCalculationBasisTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCalculationBasisTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCalculationBasisTypeInput, nullable: true }) input?: AdminListCalculationBasisTypeInput,
  ) {
    return this.service.adminCountCalculationBasisTypes(admin.id, input)
  }





  @Query(() => CalculationBasisType, { nullable: true })
  adminCalculationBasisType(@CtxUser() admin: User, @Args('calculationBasisTypeId') calculationBasisTypeId: string) {
    return this.service.adminCalculationBasisType(admin.id, calculationBasisTypeId)
  }

  @Mutation(() => CalculationBasisType, { nullable: true })
  adminCreateCalculationBasisType(@CtxUser() admin: User, @Args('input') input: AdminCreateCalculationBasisTypeInput,) {
    return this.service.adminCreateCalculationBasisType(admin.id, input)
  }

  @Mutation(() => CalculationBasisType, { nullable: true })
  adminUpdateCalculationBasisType(
    @CtxUser() admin: User,
    @Args('calculationBasisTypeId') calculationBasisTypeId: string,
    @Args('input') input: AdminUpdateCalculationBasisTypeInput,
  ) {
    return this.service.adminUpdateCalculationBasisType(admin.id, calculationBasisTypeId, input)
  }

  @Mutation(() => CalculationBasisType, { nullable: true })
  adminDeleteCalculationBasisType(@CtxUser() admin: User, @Args('calculationBasisTypeId') calculationBasisTypeId: string) {
    return this.service.adminDeleteCalculationBasisType(admin.id, calculationBasisTypeId)
  }
}

