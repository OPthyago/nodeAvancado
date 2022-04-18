import { TokenGenerator } from './../../../src/data/contracts/crypto/token'
import jwt from 'jsonwebtoken'

class JwtTokenGenerator {
  constructor (private readonly secretKey: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<void> {
    const expirationInSeconds = params.expirationInMs / 1000
    jwt.sign({ key: params.key }, this.secretKey, { expiresIn: expirationInSeconds })
  }
}

jest.mock('jsonwebtoken')

describe('JwtTokenGenerator', () => {
  let sut: JwtTokenGenerator
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeEach(() => {
    sut = new JwtTokenGenerator('any_secret')
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  it('should call sign with correct params', async () => {
    await sut.generateToken({
      key: 'any_key',
      expirationInMs: 1000
    })

    expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any_key' }, 'any_secret', { expiresIn: 1 })
    expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
  })
})
