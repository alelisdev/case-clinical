
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateNegotiationInput,
  AdminListNegotiationInput,
  AdminUpdateNegotiationInput,
  ApiNegotiationDataAccessAdminService,
  Negotiation
} from '@case-clinical/api/negotiation/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiNegotiationFeatureAdminResolver {
  constructor(private readonly service: ApiNegotiationDataAccessAdminService) {}

  @Query(() => [Negotiation], { nullable: true })
  adminNegotiations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNegotiationInput, nullable: true }) input?: AdminListNegotiationInput,
  ) {
    return this.service.adminNegotiations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountNegotiations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNegotiationInput, nullable: true }) input?: AdminListNegotiationInput,
  ) {
    return this.service.adminCountNegotiations(admin.id, input)
  }





  @Query(() => Negotiation, { nullable: true })
  adminNegotiation(@CtxUser() admin: User, @Args('negotiationId') negotiationId: string) {
    return this.service.adminNegotiation(admin.id, negotiationId)
  }

  @Mutation(() => Negotiation, { nullable: true })
  adminCreateNegotiation(@CtxUser() admin: User, @Args('input') input: AdminCreateNegotiationInput,) {
    return this.service.adminCreateNegotiation(admin.id, input)
  }

  @Mutation(() => Negotiation, { nullable: true })
  adminUpdateNegotiation(
    @CtxUser() admin: User,
    @Args('negotiationId') negotiationId: string,
    @Args('input') input: AdminUpdateNegotiationInput,
  ) {
    return this.service.adminUpdateNegotiation(admin.id, negotiationId, input)
  }

  @Mutation(() => Negotiation, { nullable: true })
  adminDeleteNegotiation(@CtxUser() admin: User, @Args('negotiationId') negotiationId: string) {
    return this.service.adminDeleteNegotiation(admin.id, negotiationId)
  }
}

