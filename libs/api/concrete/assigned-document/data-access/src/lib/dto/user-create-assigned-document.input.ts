import { Field, InputType } from '@nestjs/graphql'

import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreateTemplateInput } from '@case-clinical/api/template/data-access' 
import { UserCreateDocumentTypeInput } from '@case-clinical/api/document-type/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserCreateAssignedDocumentInput {

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

  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  document?: UserCreateDocumentInput  


  @Field(() => UserCreateTemplateInput ,{ nullable: true }) 
  template?: UserCreateTemplateInput  


  @Field(() => UserCreateDocumentTypeInput ,{ nullable: true }) 
  documentType?: UserCreateDocumentTypeInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
