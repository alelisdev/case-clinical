
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAccountStatusInput,
  AdminListAccountStatusInput,
  AdminUpdateAccountStatusInput,
  ApiAccountStatusDataAccessAdminService,
  AccountStatus
} from '@case-clinical/api/account-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAccountStatusFeatureAdminResolver {
  constructor(private readonly service: ApiAccountStatusDataAccessAdminService) {}

  @Query(() => [AccountStatus], { nullable: true })
  adminAccountStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAccountStatusInput, nullable: true }) input?: AdminListAccountStatusInput,
  ) {
    return this.service.adminAccountStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAccountStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAccountStatusInput, nullable: true }) input?: AdminListAccountStatusInput,
  ) {
    return this.service.adminCountAccountStatuses(admin.id, input)
  }





  @Query(() => AccountStatus, { nullable: true })
  adminAccountStatus(@CtxUser() admin: User, @Args('accountStatusId') accountStatusId: string) {
    return this.service.adminAccountStatus(admin.id, accountStatusId)
  }

  @Mutation(() => AccountStatus, { nullable: true })
  adminCreateAccountStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateAccountStatusInput,) {
    return this.service.adminCreateAccountStatus(admin.id, input)
  }

  @Mutation(() => AccountStatus, { nullable: true })
  adminUpdateAccountStatus(
    @CtxUser() admin: User,
    @Args('accountStatusId') accountStatusId: string,
    @Args('input') input: AdminUpdateAccountStatusInput,
  ) {
    return this.service.adminUpdateAccountStatus(admin.id, accountStatusId, input)
  }

  @Mutation(() => AccountStatus, { nullable: true })
  adminDeleteAccountStatus(@CtxUser() admin: User, @Args('accountStatusId') accountStatusId: string) {
    return this.service.adminDeleteAccountStatus(admin.id, accountStatusId)
  }
}

