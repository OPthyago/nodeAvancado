import { LoadFacebookUser } from '@/data/contracts/apis'
import { FacebookauthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock } from 'jest-mock-extended'

describe('FacebookauthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    const sut = new FacebookauthenticationService(loadFacebookUserApi)
    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when loadFacebookUserApi return undefined', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookauthenticationService(loadFacebookUserApi)
    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
