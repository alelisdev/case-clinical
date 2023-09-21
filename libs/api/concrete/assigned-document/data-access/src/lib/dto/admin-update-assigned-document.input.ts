import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminUpdateTemplateInput } from '@case-clinical/api/template/data-access' 
import { AdminUpdateDocumentTypeInput } from '@case-clinical/api/document-type/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateAssignedDocumentInput {

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

  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  document?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateTemplateInput ,{ nullable: true }) 
  template?: AdminUpdateTemplateInput  


  @Field(() => AdminUpdateDocumentTypeInput ,{ nullable: true }) 
  documentType?: AdminUpdateDocumentTypeInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  

}