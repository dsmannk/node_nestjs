import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, HydratedDocument} from "mongoose";
import {BlogService} from "./blog.service";

// export type BlogDocument = BlogService & Document; // 블로그이면서 도큐먼트인 타입 정의
export type BlogDocument = HydratedDocument<Blog>; // doc.title, doc._id, doc.createdDt 등이 타입 추론으로 자동 인식

@Schema() // 스키마임을 나타냄
export class Blog {
    @Prop() // 스키마의 프로퍼티임을 나타냄
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updatedDt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog); // 스키마 생성