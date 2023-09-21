import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AssignedDocumentInput {

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
}
