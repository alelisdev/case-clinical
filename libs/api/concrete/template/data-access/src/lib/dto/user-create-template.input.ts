import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
   import {
        AzureStorageFileInterceptor,
        UploadedFileMetadata,
        
      } from '@nestjs/azure-storage';

@InputType()
export class UserCreateTemplateInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  signatureFileType?: string

  @Field({ nullable: true }) 
  code?: string
  
  @Field(() => [UserCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserCreateAssignedDocumentInput[]

}
