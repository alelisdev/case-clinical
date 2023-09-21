
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListDocumentTypeInput,
  ApiDocumentTypeDataAccessPublicService,
  DocumentType,
} from '@case-clinical/api/document-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiDocumentTypeFeaturePublicResolver {
  constructor(private readonly service: ApiDocumentTypeDataAccessPublicService) {}
           
  @Query(() => [DocumentType], { nullable: true })
  publicDocumentTypes(
    @Args({ name: 'input', type: () => UserListDocumentTypeInput, nullable: true }) input?: UserListDocumentTypeInput,
  ) {
    return this.service.publicDocumentTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountDocumentTypes(
    @Args({ name: 'input', type: () => UserListDocumentTypeInput, nullable: true }) input?: UserListDocumentTypeInput,
  ) {
    return this.service.publicCountDocumentTypes(input)
  }

  @Query(() => [DocumentType], { nullable: true })
  publicSelectDocumentTypes(
    @Args({ name: 'input', type: () => UserListDocumentTypeInput, nullable: true }) input?: UserListDocumentTypeInput,
  ) {
    return this.service.publicSelectDocumentTypes(input)
  }

  @Query(() => DocumentType, { nullable: true })
  publicDocumentType(@Args('documentTypeId') documentTypeId: string) {
    return this.service.publicDocumentType(documentTypeId)
  }
}
