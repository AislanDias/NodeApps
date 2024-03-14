import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public slug: Slug;
  public authorId: string;

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title;
    this.content = props.content;
    this.slug = props.slug;
    this.authorId = props.authorId;
    this.id = id ?? randomUUID();
  }
}

// new Question({
//   slug: Slug.createFromText('An example title')
// })

// new Question({
//   slug: Slug('an-example-title')
// })
