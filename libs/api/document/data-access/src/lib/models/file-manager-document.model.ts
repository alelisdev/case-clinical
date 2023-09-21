import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FileManagerDocument {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: string

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  modifiedAt?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  extension?: string

  @Field({ nullable: true }) 
  parentId?: string

  @Field({ nullable: true }) 
  folderId: string

  @Field({ nullable: true }) 
  createdBy: string

  @Field({ nullable: true }) 
  size: string

  @Field({ nullable: true }) 
  type: string

  @Field({ nullable: true }) 
  contents: string

  @Field({ nullable: true }) 
  description: string
}
