import { Student } from '../../enterprise/entities/student'

export interface StudentsRepository {
  findByEmail(email: string): Promise<Student | null>
  create(question: Student): Promise<void>
}
