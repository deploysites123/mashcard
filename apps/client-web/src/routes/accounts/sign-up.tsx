import { isNil, omit, omitBy, pick } from '@mashcard/active-support'
import { Button, Form, Input, toast, useBoolean } from '@mashcard/design-system'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Trans } from 'react-i18next'
import { object, ref, string } from 'yup'

import { useDomainAvailableValidator } from '@/common/hooks'
import { useEmailAvailableValidator } from '@/common/hooks/useEmailAvailableValidator'
import { mutationResultHandler } from '@/common/utils'
import {
  useGetAccountsConfigFromWsQuery,
  useGetFederatedIdentitySessionQuery,
  UserCreateInput,
  useUserCreateMutation
} from '@/MashcardGraphQL'
import { ConfirmationEmailTips } from './_shared/ConfirmationEmailTips'
import { useAccountsI18n } from './_shared/useAccountsI18n'
import { useSignUpInitialValues } from './_shared/useSignUpInitialValues'

export const SignUp: React.FC = () => {
  const { t } = useAccountsI18n()
  const [didShowConfirmationEmailTips, { setTrue: showConfirmationEmailTips }] = useBoolean(false)
  const { data: configData } = useGetAccountsConfigFromWsQuery()

  // Set Form initial values
  const { loading: sessionLoading, data: sessionData } = useGetFederatedIdentitySessionQuery()
  const { initialValues, setFill } = useSignUpInitialValues()
  useEffect(() => {
    if (!sessionLoading) {
      setFill(
        omitBy(pick(sessionData?.federatedIdentitySession, ['domain', 'name']), isNil) as {
          domain: string
          name: string
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLoading, sessionData])
  const hasFederatedIdentity = sessionData?.federatedIdentitySession?.hasSession
  const providerName = sessionData?.federatedIdentitySession?.provider

  // Set Validator
  const domainAvailableValidator = useDomainAvailableValidator()
  const emailAvailableValidator = useEmailAvailableValidator()

  const basicValidation = object({
    domain: string().required().test(domainAvailableValidator),
    name: string().required(),
    locale: string().required(),
    timezone: string().required()
  })

  const emailPasswordFormValidation = object({
    email: string().email().required().test(emailAvailableValidator),
    password: string().required().min(8).max(128),
    confirm_password: string()
      .min(8)
      .max(128)
      .required()
      .oneOf([ref('password'), null])
  }).concat(basicValidation)

  // On Form Submit
  const [userCreate, { loading: userCreateLoading }] = useUserCreateMutation()
  const onFinish = async (values: object): Promise<void> => {
    const input = omit(values, ['confirm_password']) as UserCreateInput
    const { data } = await userCreate({ variables: { input } })
    const result = data?.userCreate
    mutationResultHandler(result, () => {
      if (result?.redirectPath && result.isUserActive) {
        void toast.success(t('devise:registrations.signed_up'))
        globalThis.location.href = result.redirectPath
      } else {
        showConfirmationEmailTips()
      }
    })
  }

  const form = Form.useForm<UserCreateInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    yup: hasFederatedIdentity ? basicValidation : emailPasswordFormValidation
  })

  // https://react-hook-form.com/api/useform/reset
  React.useEffect(() => {
    form.reset({
      domain: initialValues.domain,
      name: initialValues.name,
      locale: initialValues.locale,
      timezone: initialValues.timezone
    })
  }, [form, initialValues.domain, initialValues.name, initialValues.locale, initialValues.timezone])

  // Email unactive tips
  if (didShowConfirmationEmailTips) {
    return <ConfirmationEmailTips email={form.getValues('email')!} />
  }

  // View
  const pageTitle = providerName
    ? t('sessions.sign_up_via', { provider: t(`provider.${providerName}`) })
    : t('sessions.sign_up')

  const EmailPasswordFields = (
    <>
      <Form.Field name="email" typeof="email" label={t('sessions.email')}>
        <Input />
      </Form.Field>
      <Form.Field name="password" label={t('sessions.password')}>
        <Input type="password" />
      </Form.Field>
      <Form.Field name="confirm_password" label={t('sessions.confirm_password')}>
        <Input type="password" />
      </Form.Field>
    </>
  )

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <Form
        form={form}
        css={{
          marginBottom: '48px'
        }}
        layout="vertical"
        onSubmit={onFinish}
      >
        <Form.Field
          label={t('sessions.domain')}
          name="domain"
          description={<small>{t('sessions.domain_description')}</small>}
        >
          <Input />
        </Form.Field>
        <Form.Field label={t('sessions.name')} name="name">
          <Input />
        </Form.Field>
        {
          // Federated Sign Up could skip email and password
          !hasFederatedIdentity && EmailPasswordFields
        }
        <Form.Field hidden name="locale">
          <Input type="hidden" />
        </Form.Field>
        <Form.Field hidden name="timezone">
          <Input type="hidden" />
        </Form.Field>
        <Form.Field>
          <Button type="primary" htmlType="submit" size="lg" loading={userCreateLoading} block>
            {t('sessions.sign_up')}
          </Button>
        </Form.Field>
        <div>
          <small>
            <Trans
              t={t}
              i18nKey="sessions.agree_to_agreement"
              components={[
                // False positive
                // eslint-disable-next-line jsx-a11y/anchor-has-content, react/jsx-key
                <a target="_blank" href={configData?.metadata.config.userAgreementLink} />
              ]}
            />
          </small>
        </div>
      </Form>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default SignUp
