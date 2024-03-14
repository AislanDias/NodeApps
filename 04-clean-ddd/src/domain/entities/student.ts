import { randomUUID } from "node:crypto"

class Student {
  public name: string
  public id: string

  constructor(title: string, content: string){
    this.name = name
    this.id = id ?? randomUUID()
  }
}
