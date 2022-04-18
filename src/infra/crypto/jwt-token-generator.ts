import { TokenGenerator } from './../../../src/data/contracts/crypto/token'
import jwt from 'jsonwebtoken'

export class JwtTokenGenerator implements TokenGenerator {
  constructor (private readonly secretKey: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: params.key }, this.secretKey, { expiresIn: expirationInSeconds })
  }
}
