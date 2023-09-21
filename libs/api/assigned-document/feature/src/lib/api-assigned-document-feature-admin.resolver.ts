
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAssignedDocumentInput,
  AdminListAssignedDocumentInput,
  AdminUpdateAssignedDocumentInput,
  ApiAssignedDocumentDataAccessAdminService,
  AssignedDocument
} from '@case-clinical/api/assigned-document/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAssignedDocumentFeatureAdminResolver {
  constructor(private readonly service: ApiAssignedDocumentDataAccessAdminService) {}

  @Query(() => [AssignedDocument], { nullable: true })
  adminAssignedDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAssignedDocumentInput, nullable: true }) input?: AdminListAssignedDocumentInput,
  ) {
    return this.service.adminAssignedDocuments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAssignedDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAssignedDocumentInput, nullable: true }) input?: AdminListAssignedDocumentInput,
  ) {
    return this.service.adminCountAssignedDocuments(admin.id, input)
  }





  @Query(() => AssignedDocument, { nullable: true })
  adminAssignedDocument(@CtxUser() admin: User, @Args('assignedDocumentId') assignedDocumentId: string) {
    return this.service.adminAssignedDocument(admin.id, assignedDocumentId)
  }

  @Mutation(() => AssignedDocument, { nullable: true })
  adminCreateAssignedDocument(@CtxUser() admin: User, @Args('input') input: AdminCreateAssignedDocumentInput,) {
    return this.service.adminCreateAssignedDocument(admin.id, input)
  }

  @Mutation(() => AssignedDocument, { nullable: true })
  adminUpdateAssignedDocument(
    @CtxUser() admin: User,
    @Args('assignedDocumentId') assignedDocumentId: string,
    @Args('input') input: AdminUpdateAssignedDocumentInput,
  ) {
    return this.service.adminUpdateAssignedDocument(admin.id, assignedDocumentId, input)
  }

  @Mutation(() => AssignedDocument, { nullable: true })
  adminDeleteAssignedDocument(@CtxUser() admin: User, @Args('assignedDocumentId') assignedDocumentId: string) {
    return this.service.adminDeleteAssignedDocument(admin.id, assignedDocumentId)
  }
}

