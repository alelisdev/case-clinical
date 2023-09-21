import { Field, ObjectType } from "@nestjs/graphql";
import { string } from "joi";

type CommonType = {
    message: String
    code: String
}

@ObjectType()
class ResponseObject {
    @Field({ nullable: true }) 
    message?: string

    @Field({ nullable: true }) 
    code?: string
}

@ObjectType()
export class CommonResponse {
    @Field(() => ResponseObject, { nullable: true }) 
    data?: CommonType

    @Field(() => ResponseObject, { nullable: true }) 
    error?: CommonType
}