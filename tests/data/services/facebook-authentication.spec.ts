import { LoadFacebookUser } from '@/data/contracts/apis'
import { FacebookauthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookUserSpy implements LoadFacebookUser {
  token?: string
  result?: undefined
  async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookauthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserSpy()
    const sut = new FacebookauthenticationService(loadFacebookUserApi)
    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })

  it('should return AuthenticationError when loadFacebookUserApi return undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookauthenticationService(loadFacebookUserApi)
    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
