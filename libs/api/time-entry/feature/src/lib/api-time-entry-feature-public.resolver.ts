
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
} from '@case-clinical/api/auth/util'

import {
  ApiTimeEntryDataAccessPublicService,
  TimeEntry,
} from '@case-clinical/api/time-entry/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTimeEntryFeaturePublicResolver {
  constructor(private readonly service: ApiTimeEntryDataAccessPublicService) {}
           
}

