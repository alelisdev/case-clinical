
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'
import { ApiStripeService, BillingInfo, Price, PriceListInput, SubscriptionListInput, SubscriptionResult, UserCreateBillingInfoInput, UserUpdateBillingInfoInput, PriceSubscription } from '@case-clinical/api/stripe/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiStripeFeatureResolver {
  constructor(private readonly service: ApiStripeService) {}

  @Query(() => [Price])
  async listPrices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => PriceListInput }) input: PriceListInput
  ) {
    return this.service.listPrices(input)
  }

  @Query(() => [PriceSubscription])
  async listSubscriptions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => SubscriptionListInput }) input: SubscriptionListInput
  ) {
    return this.service.listSubscriptions(user.customerId, input)
  }

  @Mutation(() => SubscriptionResult, { nullable: true })
  async subscribe(
    @CtxUser() user: User,
    @Args({ name: 'priceId', type: () => String }) priceId: string
  ) {
    const subscription =  await this.service.createSubscription(priceId, user.customerId, user.id);
    return {
      status: subscription.id
    };
  }

  @Mutation(() => SubscriptionResult, { nullable: true })
  async cancelSubcribe(
    @CtxUser() user: User,
    @Args({ name: 'subscriptionId', type: () => String }) subscriptionId: string
  ) {
    const subscription =  await this.service.cancelSubscription(user.id, subscriptionId);
    return {
      status: subscription.status
    };
  }

  @Query(() => BillingInfo, { nullable: true })
  userBillingInfo(
    @CtxUser() user: User,
    @Args({ name: 'userId', type: () => String, nullable: true }) userId?: string,
  ) {
    return this.service.userBillingInfo(user)
  }

  @Mutation(() => BillingInfo, { nullable: true })
  userUpdateBillingInfo(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateBillingInfoInput,
  ) {
    return this.service.userUpdateBillingInfo(user, input)
  }

  @Mutation(() => BillingInfo, { nullable: true })
  userCreateBillingInfo(
    @CtxUser() user: User,
    @Args('input') input: UserCreateBillingInfoInput,
  ) {
    return this.service.userCreateBillingInfo(user, input)
  }
}
