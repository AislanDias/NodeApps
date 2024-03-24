import { Encryper } from '@/domain/forum/application/cryptography/encrypter'

export class FakeEncrypter implements Encryper {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
