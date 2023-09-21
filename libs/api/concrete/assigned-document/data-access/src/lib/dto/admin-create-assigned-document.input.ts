import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateTemplateInput } from '@case-clinical/api/template/data-access' 
import { AdminCreateDocumentTypeInput } from '@case-clinical/api/document-type/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateAssignedDocumentInput {

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

  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  document?: AdminCreateDocumentInput  


  @Field(() => AdminCreateTemplateInput ,{ nullable: true }) 
  template?: AdminCreateTemplateInput  


  @Field(() => AdminCreateDocumentTypeInput ,{ nullable: true }) 
  documentType?: AdminCreateDocumentTypeInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

}