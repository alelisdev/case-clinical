


import { Module } from '@nestjs/common'
import { ApiAzureFeatureUserResolver } from './azure.resolver'
import { ApiAzureDataAccessUserService } from './sas.service'
@Module({
  providers: [ApiAzureFeatureUserResolver, ApiAzureDataAccessUserService],
})
export class ApiAzureDataAccessModule {}
