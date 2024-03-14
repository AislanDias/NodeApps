import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question extends Entity<QuestionProps> {}

// new Question({
//   slug: Slug.createFromText('An example title')
// })

// new Question({
//   slug: Slug('an-example-title')
// })
