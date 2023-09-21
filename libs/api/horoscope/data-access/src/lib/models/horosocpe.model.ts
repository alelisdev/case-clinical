import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Horoscope {

 @Field({ nullable: true })
 icon?: string

 @Field({ nullable: true })
 content?: string
}
