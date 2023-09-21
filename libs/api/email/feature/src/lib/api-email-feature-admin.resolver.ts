
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateEmailInput,
  AdminListEmailInput,
  AdminUpdateEmailInput,
  ApiEmailDataAccessAdminService,
  Email
} from '@case-clinical/api/email/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiEmailFeatureAdminResolver {
  constructor(private readonly service: ApiEmailDataAccessAdminService) {}

  @Query(() => [Email], { nullable: true })
  adminEmails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEmailInput, nullable: true }) input?: AdminListEmailInput,
  ) {
    return this.service.adminEmails(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountEmails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEmailInput, nullable: true }) input?: AdminListEmailInput,
  ) {
    return this.service.adminCountEmails(admin.id, input)
  }





  @Query(() => Email, { nullable: true })
  adminEmail(@CtxUser() admin: User, @Args('emailId') emailId: string) {
    return this.service.adminEmail(admin.id, emailId)
  }

  @Mutation(() => Email, { nullable: true })
  adminCreateEmail(@CtxUser() admin: User, @Args('input') input: AdminCreateEmailInput,) {
    return this.service.adminCreateEmail(admin.id, input)
  }

  @Mutation(() => Email, { nullable: true })
  adminUpdateEmail(
    @CtxUser() admin: User,
    @Args('emailId') emailId: string,
    @Args('input') input: AdminUpdateEmailInput,
  ) {
    return this.service.adminUpdateEmail(admin.id, emailId, input)
  }

  @Mutation(() => Email, { nullable: true })
  adminDeleteEmail(@CtxUser() admin: User, @Args('emailId') emailId: string) {
    return this.service.adminDeleteEmail(admin.id, emailId)
  }
}

