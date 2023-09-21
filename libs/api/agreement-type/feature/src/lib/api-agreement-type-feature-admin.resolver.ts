
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAgreementTypeInput,
  AdminListAgreementTypeInput,
  AdminUpdateAgreementTypeInput,
  ApiAgreementTypeDataAccessAdminService,
  AgreementType
} from '@case-clinical/api/agreement-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAgreementTypeFeatureAdminResolver {
  constructor(private readonly service: ApiAgreementTypeDataAccessAdminService) {}

  @Query(() => [AgreementType], { nullable: true })
  adminAgreementTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAgreementTypeInput, nullable: true }) input?: AdminListAgreementTypeInput,
  ) {
    return this.service.adminAgreementTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAgreementTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAgreementTypeInput, nullable: true }) input?: AdminListAgreementTypeInput,
  ) {
    return this.service.adminCountAgreementTypes(admin.id, input)
  }





  @Query(() => AgreementType, { nullable: true })
  adminAgreementType(@CtxUser() admin: User, @Args('agreementTypeId') agreementTypeId: string) {
    return this.service.adminAgreementType(admin.id, agreementTypeId)
  }

  @Mutation(() => AgreementType, { nullable: true })
  adminCreateAgreementType(@CtxUser() admin: User, @Args('input') input: AdminCreateAgreementTypeInput,) {
    return this.service.adminCreateAgreementType(admin.id, input)
  }

  @Mutation(() => AgreementType, { nullable: true })
  adminUpdateAgreementType(
    @CtxUser() admin: User,
    @Args('agreementTypeId') agreementTypeId: string,
    @Args('input') input: AdminUpdateAgreementTypeInput,
  ) {
    return this.service.adminUpdateAgreementType(admin.id, agreementTypeId, input)
  }

  @Mutation(() => AgreementType, { nullable: true })
  adminDeleteAgreementType(@CtxUser() admin: User, @Args('agreementTypeId') agreementTypeId: string) {
    return this.service.adminDeleteAgreementType(admin.id, agreementTypeId)
  }
}

