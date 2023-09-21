import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class TemplateInput {

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

}
