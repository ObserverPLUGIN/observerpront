import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../shared/layouts/AuthLayout'
import { confirmPasswordReset, requestPasswordReset } from '../api/authApi'
import { PasswordResetForm } from '../components/PasswordResetForm'

const summaryItems = [
  {
    label: '복구 시작',
    value: '등록 이메일 확인',
    copy: '아이디보다 이메일을 먼저 떠올릴 수 있게 안내하면, 운영자가 오래된 계정도 쉽게 찾을 수 있습니다.',
  },
  {
    label: '보안 설계',
    value: '코드 인증 후 새 비밀번호 저장',
    copy: '코드 발송과 비밀번호 변경을 한 흐름으로 이어주면 사용자가 중간에 길을 잃지 않습니다.',
  },
  {
    label: '메시지 톤',
    value: '불안감 대신 절차 안내',
    copy: '에러 중심 문구보다 “다음에 무슨 일이 일어나는지”를 먼저 보여주는 편이 더 안정적으로 느껴집니다.',
  },
]

export function PasswordResetPage({ preview = false }) {
  const navigate = useNavigate()
  const [stage, setStage] = useState('request')
  const [formState, setFormState] = useState({
    email: 'admin@observer.local',
    code: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [debugCode, setDebugCode] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
    setErrorMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    if (preview) {
      setSuccessMessage('비밀번호 재설정 프리뷰 화면입니다. 실제 API 요청은 실행하지 않습니다.')
      return
    }

    setIsSubmitting(true)
    try {
      if (stage === 'request') {
        const payload = await requestPasswordReset({ email: formState.email })
        setStage('confirm')
        setSuccessMessage(payload.message)
        setDebugCode(payload.debugCode ?? '')
      } else {
        if (formState.newPassword !== formState.confirmPassword) {
          setErrorMessage('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
          return
        }

        const payload = await confirmPasswordReset({
          email: formState.email,
          code: formState.code,
          newPassword: formState.newPassword,
        })
        navigate('/login', {
          state: {
            notice: payload.message,
          },
        })
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResend() {
    if (preview) {
      setSuccessMessage('재설정 코드 재전송 프리뷰입니다.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')
    try {
      const payload = await requestPasswordReset({ email: formState.email })
      setSuccessMessage(payload.message)
      setDebugCode(payload.debugCode ?? '')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleBackToRequest() {
    setStage('request')
    setFormState((current) => ({
      ...current,
      code: '',
      newPassword: '',
      confirmPassword: '',
    }))
    setErrorMessage('')
  }

  return (
    <AuthLayout
      eyebrow="Observer Recovery Center"
      title="비밀번호 재설정은 실수 방지와 보안 신뢰감을 동시에 주는 화면이어야 합니다."
      description="운영 계정 복구 화면은 공포감을 주기보다, 코드 발송과 새 비밀번호 설정 과정을 짧고 분명하게 보여주는 편이 좋습니다."
      summaryItems={summaryItems}
    >
      <PasswordResetForm
        formState={formState}
        stage={stage}
        errorMessage={errorMessage}
        successMessage={successMessage}
        debugCode={debugCode}
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onResend={handleResend}
        onBackToRequest={handleBackToRequest}
      />
    </AuthLayout>
  )
}
