import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class RequiredFieldInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  entityName?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  medLevelId?: string
}
