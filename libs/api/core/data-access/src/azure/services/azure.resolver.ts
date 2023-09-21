
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { ApiAzureDataAccessUserService } from './sas.service'
import { SasTokenRequest } from '../dto/sas-token-request.input'
import { SasTokenResult } from '../dto/sas-token-result'
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access'
import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAzureFeatureUserResolver {
  constructor(private readonly service: ApiAzureDataAccessUserService) {}

  @Query(() => SasTokenResult, { nullable: true })
  getSasToken(@CtxUser() user: User) : Promise<SasTokenResult> {
    if(user == null) {
      return
    }

    return this.service.sas(user.id)
  }

  @Query(() => SasTokenResult, { nullable: true })
  getFileSasToken(@CtxUser() user: User, @Args('input') input: UserUpdateDocumentInput) : Promise<SasTokenResult> {
    if(user == null) {
      return
    }

    return this.service.fileSas(user.id, input)
  }
}

