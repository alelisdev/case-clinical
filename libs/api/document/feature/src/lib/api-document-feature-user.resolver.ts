
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateDocumentInput,
  UserListDocumentInput,
  UserUpdateDocumentInput,
  UserUpdateDocumentsInput,
  Document,
} from '@case-clinical/api/document/data-access'
import { CorePaging, UpdateResult, ApiCoreSharedService } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'



import { UserListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { UserListPrescriptionInput, Prescription } from '@case-clinical/api/prescription/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'
import { UserListPatientStudyInput, PatientStudy } from '@case-clinical/api/patient-study/data-access'
import { UserListProcedureVendorInput, ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiDocumentFeatureUserResolver {
  constructor(private readonly service: ApiCoreSharedService) {}

  @Query(() => [Document], { nullable: true })
  userDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentInput, nullable: true }) input?: UserListDocumentInput,
  ) {
    return this.service.userDocuments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentInput, nullable: true }) input?: UserListDocumentInput,
  ) {
    return this.service.userCountDocuments(user.id, input)
  }

  @Query(() => [Document], { nullable: true })
  userSelectDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentInput, nullable: true }) input?: UserListDocumentInput,
  ) {
    return this.service.userSelectDocuments(user.id, input)
  }







  @Query(() => Document, { nullable: true })
  userDocument(@CtxUser() user: User, @Args('documentId') documentId: string) {
    return this.service.userDocument(user.id, documentId)
  }

  @Mutation(() => Document, { nullable: true })
  userCreateDocument(@CtxUser() user: User, @Args('input') input: UserCreateDocumentInput,) {
    return this.service.userCreateDocument(user.id, input)
  }

  @Mutation(() => Document, { nullable: true })
  userUpdateDocument(
    @CtxUser() user: User,
    @Args('documentId') documentId: string,
    @Args('input') input: UserUpdateDocumentInput,
  ) {
    return this.service.userUpdateDocument(user.id, documentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateDocuments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateDocumentsInput,
  ) {
    return this.service.userUpdateDocuments(user.id, input)
  }

  @Mutation(() => Document, { nullable: true })
  userDeleteDocument(
    @CtxUser() user: User, 
    @Args('documentId') documentId: string,
    @Args('featureName') featureName: string
    ) {
    return this.service.userDeleteDocument(user.id, documentId, featureName)
  }
}

