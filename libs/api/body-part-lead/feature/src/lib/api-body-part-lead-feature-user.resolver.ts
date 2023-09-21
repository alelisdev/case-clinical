
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBodyPartLeadInput,
  UserListBodyPartLeadInput,
  UserUpdateBodyPartLeadInput,
  UserUpdateBodyPartLeadsInput,
  ApiBodyPartLeadDataAccessUserService,
  BodyPartLead,
} from '@case-clinical/api/body-part-lead/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLeadInput, Lead } from '@case-clinical/api/lead/data-access'
import { UserListBodyPartInput, BodyPart } from '@case-clinical/api/body-part/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBodyPartLeadFeatureUserResolver {
  constructor(private readonly service: ApiBodyPartLeadDataAccessUserService) {}

  @Query(() => [BodyPartLead], { nullable: true })
  userBodyPartLeads(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBodyPartLeadInput, nullable: true }) input?: UserListBodyPartLeadInput,
  ) {
    return this.service.userBodyPartLeads(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBodyPartLeads(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBodyPartLeadInput, nullable: true }) input?: UserListBodyPartLeadInput,
  ) {
    return this.service.userCountBodyPartLeads(user.id, input)
  }

  @Query(() => [BodyPartLead], { nullable: true })
  userSelectBodyPartLeads(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBodyPartLeadInput, nullable: true }) input?: UserListBodyPartLeadInput,
  ) {
    return this.service.userSelectBodyPartLeads(user.id, input)
  }







  @Query(() => BodyPartLead, { nullable: true })
  userBodyPartLead(@CtxUser() user: User, @Args('bodyPartLeadId') bodyPartLeadId: string) {
    return this.service.userBodyPartLead(user.id, bodyPartLeadId)
  }

  @Mutation(() => BodyPartLead, { nullable: true })
  userCreateBodyPartLead(@CtxUser() user: User, @Args('input') input: UserCreateBodyPartLeadInput,) {
    return this.service.userCreateBodyPartLead(user.id, input)
  }

  @Mutation(() => BodyPartLead, { nullable: true })
  userUpdateBodyPartLead(
    @CtxUser() user: User,
    @Args('bodyPartLeadId') bodyPartLeadId: string,
    @Args('input') input: UserUpdateBodyPartLeadInput,
  ) {
    return this.service.userUpdateBodyPartLead(user.id, bodyPartLeadId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateBodyPartLeads(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateBodyPartLeadsInput,
  ) {
    return this.service.userUpdateBodyPartLeads(user.id, input)
  }

  @Mutation(() => BodyPartLead, { nullable: true })
  userDeleteBodyPartLead(@CtxUser() user: User, @Args('bodyPartLeadId') bodyPartLeadId: string) {
    return this.service.userDeleteBodyPartLead(user.id, bodyPartLeadId)
  }
}

