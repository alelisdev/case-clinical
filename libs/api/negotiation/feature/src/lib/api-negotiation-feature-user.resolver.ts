
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateNegotiationInput,
  UserListNegotiationInput,
  UserUpdateNegotiationInput,
  ApiNegotiationDataAccessUserService,
  Negotiation,
} from '@case-clinical/api/negotiation/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiNegotiationFeatureUserResolver {
  constructor(private readonly service: ApiNegotiationDataAccessUserService) {}

  @Query(() => [Negotiation], { nullable: true })
  userNegotiations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNegotiationInput, nullable: true }) input?: UserListNegotiationInput,
  ) {
    return this.service.userNegotiations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountNegotiations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNegotiationInput, nullable: true }) input?: UserListNegotiationInput,
  ) {
    return this.service.userCountNegotiations(user.id, input)
  }






  @Query(() => Negotiation, { nullable: true })
  userNegotiation(@CtxUser() user: User, @Args('negotiationId') negotiationId: string) {
    return this.service.userNegotiation(user.id, negotiationId)
  }

  @Mutation(() => Negotiation, { nullable: true })
  userCreateNegotiation(@CtxUser() user: User, @Args('input') input: UserCreateNegotiationInput,) {
    return this.service.userCreateNegotiation(user.id, input)
  }

  @Mutation(() => Negotiation, { nullable: true })
  userUpdateNegotiation(
    @CtxUser() user: User,
    @Args('negotiationId') negotiationId: string,
    @Args('input') input: UserUpdateNegotiationInput,
  ) {
    return this.service.userUpdateNegotiation(user.id, negotiationId, input)
  }

  @Mutation(() => Negotiation, { nullable: true })
  userDeleteNegotiation(@CtxUser() user: User, @Args('negotiationId') negotiationId: string) {
    return this.service.userDeleteNegotiation(user.id, negotiationId)
  }
}

