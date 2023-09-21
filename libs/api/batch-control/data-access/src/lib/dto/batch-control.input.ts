import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class BatchControlInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  trackingNumber?: string

  @Field({ nullable: true }) 
  batchTotal?: number

  @Field({ nullable: true }) 
  defaultGLCode?: string

  @Field({ nullable: true }) 
  posted?: boolean

}
