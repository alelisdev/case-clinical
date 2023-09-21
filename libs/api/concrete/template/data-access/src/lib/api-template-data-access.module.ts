
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { HttpModule } from '@nestjs/axios'
import { ApiTemplateDataAccessAdminService } from './api-template-data-access-admin.service'
import { ApiTemplateDataAccessUserService } from './api-template-data-access-user.service'
import { ApiTemplateDataAccessPublicService } from './api-template-data-access-public.service'
import { AzureStorageModule } from '@nestjs/azure-storage'

@Module({
  imports: [
    AzureStorageModule.withConfig({
    sasKey: process.env['AZURE_STORAGE_SAS_KEY'],
    accountName: process.env['AZURE_STORAGE_ACCOUNT'],
    containerName: process.env['AZURE_CONTAINER_NAME']
  }),
  ApiCoreDataAccessModule, HttpModule
],
  providers: [ApiTemplateDataAccessAdminService, ApiTemplateDataAccessUserService, ApiTemplateDataAccessPublicService],
  exports: [ApiTemplateDataAccessAdminService, ApiTemplateDataAccessUserService, ApiTemplateDataAccessPublicService],
})
export class ApiTemplateDataAccessModule {}
