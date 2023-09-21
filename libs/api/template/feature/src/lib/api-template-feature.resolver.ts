import { Parent, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql'
import { Template, UserCreateTemplateInput, UserUpdateTemplateInput } from '@case-clinical/api/template/data-access'

// import {
//     Controller,
//     Logger,
//     Post,
//     UploadedFile,
//     UseInterceptors,
//   } from '@nestjs/common';
//   import { FileInterceptor } from '@nestjs/platform-express';
//   import {
//     AzureStorageFileInterceptor,
//     UploadedFileMetadata,
    
//   } from '@nestjs/azure-storage';
  
//   @Controller()
//   export class AppController {
    
//     @Post('azure/upload')
//     @UseInterceptors(
//       AzureStorageFileInterceptor('file'),
//     )
//     UploadedFilesUsingInterceptor(
//       @UploadedFile()
//       file: UploadedFileMetadata,
//     ) {
//       Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
//     }
//   }

// @Resolver(() => UserCreateTemplateInput || UserUpdateTemplateInput)
// export class ApiTemplateFeatureResolver {
//   @ResolveField(() => String, { nullable: true })
//   attachment(@Parent() template: UserCreateTemplateInput) {
//     const attachment = template?.attachment

//     let buff = Buffer.from(attachment, 'base64');
//     //TODO: Set in blob storage and return the blob:// path
//     //Set the rest of the metadata about the blob with SAS Token

//     return buff 
//   }
// }

// @Resolver(() => Template)
// export class ApiTemplateOutputFeatureResolver {
//   @ResolveField(() => String, { nullable: true })
//   attachment(@Parent() template: Template) {
//     const attachment = template?.attachment
//     let buff = Buffer.from(attachment).toString('base64')
    
//     //TODO: Set in blob storage and return the blob:// path
//     //Set the rest of the metadata about the blob with SAS Token

//     return buff 
//   }
// }
