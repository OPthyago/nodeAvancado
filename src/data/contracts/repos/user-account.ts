export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}
export interface CreateFacebookAccountRepository {
  createFromFacebook: (params: CreateFacebookAccountRepository.Params) => Promise<CreateFacebookAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }
  export type Result = undefined
}

export namespace CreateFacebookAccountRepository {
  export type Params = {
    name: string
    email: string
    facebookId: string
  }
  export type Result = undefined
}
