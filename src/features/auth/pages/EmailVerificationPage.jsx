import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../shared/layouts/AuthLayout'
import { resendVerificationCode, verifyEmailCode } from '../api/authApi'
import { EmailVerificationForm } from '../components/EmailVerificationForm'

const summaryItems = [
  {
    label: '인증 채널',
    value: '링크와 코드 입력 병행',
    copy: '메일 링크가 막히는 환경도 있으니, 6자리 코드 입력 방식은 함께 보여주는 편이 좋습니다.',
  },
  {
    label: '화면 우선순위',
    value: '성공 가능성이 높은 행동 먼저',
    copy: '코드 입력, 재전송, 남은 시간 정보를 같은 카드에 묶으면 인증 실패율을 줄일 수 있습니다.',
  },
  {
    label: '후속 동선',
    value: '인증 후 바로 로그인',
    copy: '인증이 끝난 다음 즉시 로그인 화면으로 돌아가면 사용자가 흐름을 완료했다고 느끼기 쉽습니다.',
  },
]

export function EmailVerificationPage({ preview = false }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: location.state?.email ?? 'admin@observer.local',
    code: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(location.state?.notice ?? '')
  const [debugCode, setDebugCode] = useState(location.state?.debugCode ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)

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
      setSuccessMessage('이메일 인증 프리뷰 화면입니다. 실제 API 요청은 실행하지 않습니다.')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = await verifyEmailCode({
        email: formState.email,
        code: formState.code,
      })
      navigate('/login', {
        state: {
          notice: payload.message,
        },
      })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResend() {
    if (preview) {
      setSuccessMessage('인증 메일 재전송 프리뷰입니다.')
      return
    }

    setIsResending(true)
    setErrorMessage('')
    try {
      const payload = await resendVerificationCode({ email: formState.email })
      setSuccessMessage(payload.message)
      setDebugCode(payload.debugCode ?? '')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Observer Verification Step"
      title="이메일 인증은 가장 중요한 행동만 남기고, 나머지는 보조 동작으로 내려야 합니다."
      description="인증 화면은 메시지보다 성공 행동이 눈에 먼저 들어와야 합니다. 코드를 크게 보이게 하고, 남은 시간과 재전송을 가까이 두면 사용 흐름이 훨씬 자연스러워집니다."
      summaryItems={summaryItems}
    >
      <EmailVerificationForm
        formState={formState}
        errorMessage={errorMessage}
        successMessage={successMessage}
        debugCode={debugCode}
        isSubmitting={isSubmitting}
        isResending={isResending}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onResend={handleResend}
      />
    </AuthLayout>
  )
}
