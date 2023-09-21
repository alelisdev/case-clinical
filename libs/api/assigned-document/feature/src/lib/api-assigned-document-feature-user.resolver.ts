
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAssignedDocumentInput,
  UserListAssignedDocumentInput,
  UserUpdateAssignedDocumentInput,
  ApiAssignedDocumentDataAccessUserService,
  AssignedDocument,
} from '@case-clinical/api/assigned-document/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAssignedDocumentFeatureUserResolver {
  constructor(private readonly service: ApiAssignedDocumentDataAccessUserService) {}

  @Query(() => [AssignedDocument], { nullable: true })
  userAssignedDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAssignedDocumentInput, nullable: true }) input?: UserListAssignedDocumentInput,
  ) {
    return this.service.userAssignedDocuments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAssignedDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAssignedDocumentInput, nullable: true }) input?: UserListAssignedDocumentInput,
  ) {
    return this.service.userCountAssignedDocuments(user.id, input)
  }


  @Query(() => AssignedDocument, { nullable: true })
  userAssignedDocument(@CtxUser() user: User, @Args('assignedDocumentId') assignedDocumentId: string) {
    return this.service.userAssignedDocument(user.id, assignedDocumentId)
  }

  @Query(() => String, { nullable: true })
  async userRenderAssignedDocument(@CtxUser() user: User, @Args('model') model: string, @Args('template') template: string,  ) {
    let result = await this.service.userRenderAssignedDocument(user.id, model, template)
    return result
  }

  @Mutation(() => AssignedDocument, { nullable: true })
  userCreateAssignedDocument(@CtxUser() user: User, @Args('input') input: UserCreateAssignedDocumentInput,) {
    return this.service.userCreateAssignedDocument(user.id, input)
  }

  @Mutation(() => AssignedDocument, { nullable: true })
  userUpdateAssignedDocument(
    @CtxUser() user: User,
    @Args('assignedDocumentId') assignedDocumentId: string,
    @Args('input') input: UserUpdateAssignedDocumentInput,
  ) {
    return this.service.userUpdateAssignedDocument(user.id, assignedDocumentId, input)
  }

  @Mutation(() => AssignedDocument, { nullable: true })
  userDeleteAssignedDocument(@CtxUser() user: User, @Args('assignedDocumentId') assignedDocumentId: string) {
    return this.service.userDeleteAssignedDocument(user.id, assignedDocumentId)
  }
}

