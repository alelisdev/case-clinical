import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdateTemplateInput } from '@case-clinical/api/template/data-access' 
import { UserUpdateDocumentTypeInput } from '@case-clinical/api/document-type/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserUpdateAssignedDocumentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  expirationDate?: Date

  @Field({ nullable: true }) 
  entityName?: string

  @Field({ nullable: true }) 
  entityId?: string

  @Field({ nullable: true }) 
  documentId?: string

  @Field({ nullable: true }) 
  templateId?: string

  @Field({ nullable: true }) 
  documentTypeId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  document?: UserUpdateDocumentInput  


  @Field(() => UserUpdateTemplateInput ,{ nullable: true }) 
  template?: UserUpdateTemplateInput  


  @Field(() => UserUpdateDocumentTypeInput ,{ nullable: true }) 
  documentType?: UserUpdateDocumentTypeInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput  

}