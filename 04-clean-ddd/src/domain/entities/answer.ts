import { Entity } from "@/core/entities/entity";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface AnswerProps {
  content: string;
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

// Only create setters when you need them, otherwise don't
// Getters can be useful to implement business logic inside them, or to get
// specific information
export class Answer extends Entity<AnswerProps> {
  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    const question = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return question;
  }
}
