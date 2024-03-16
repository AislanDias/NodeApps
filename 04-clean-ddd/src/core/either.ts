// PurifyUs already implements those concepts

// Left -> Error / Right -> Success

// The Happy Path always happen at right
// UI -> CTRL -> USE CASE -> ENTITY -> USE CASE -> REPOSITORY -> DATABASE

// The Unappy Path always happen at left :-(
// UI -> CTRL -> USE CASE -> ENTITY <- USE CASE X REPOSITORY X DATABASE

// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

// Success
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
