import { Field, ObjectType } from '@nestjs/graphql'

import { Document } from '@case-clinical/api/document/data-access'

import { Template } from '@case-clinical/api/template/data-access'

import { DocumentType } from '@case-clinical/api/document-type/data-access'

import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class AssignedDocument {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => Document, { nullable: true }) 
  document?: Document  

  @Field(() => Template, { nullable: true }) 
  template?: Template  

  @Field(() => DocumentType, { nullable: true }) 
  documentType?: DocumentType  

  @Field(() => User, { nullable: true }) 
  user?: User  

}
