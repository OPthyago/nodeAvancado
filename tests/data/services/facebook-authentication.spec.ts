import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos'
import { LoadFacebookUser } from '@/data/contracts/apis'
import { FacebookauthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookauthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUser>
  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>
  let createFacebookAccountRepository: MockProxy<CreateFacebookAccountRepository>
  let sut: FacebookauthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadUserAccountRepository = mock()
    createFacebookAccountRepository = mock()
    sut = new FacebookauthenticationService(loadFacebookUserApi, loadUserAccountRepository, createFacebookAccountRepository)

    loadFacebookUserApi.loadUser.mockResolvedValue({
      name: 'any_facebook_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })

  it('should call loadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({
      token
    })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when loadFacebookUserApi return undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call loadUserAccountRepository when LoadFacebookUserApi return data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: 'any_facebook_email' })
    expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should call createFacebookAccountRepository when LoadFacebookUserApi return undefined', async () => {
    await sut.perform({ token })

    expect(createFacebookAccountRepository.createFromFacebook).toHaveBeenCalledWith({
      name: 'any_facebook_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
    expect(createFacebookAccountRepository.createFromFacebook).toHaveBeenCalledTimes(1)
  })
})
