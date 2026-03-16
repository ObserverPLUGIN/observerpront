import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../../shared/layouts/AuthLayout'
import { registerAccount } from '../api/authApi'
import { RegisterForm } from '../components/RegisterForm'

const summaryItems = [
  {
    label: '등록 방식',
    value: '이메일 기반 관리자 등록',
    copy: '권한이 필요한 운영 도구라는 점을 먼저 설명하고, 가입 완료 후 이메일 인증 단계를 안내합니다.',
  },
  {
    label: '검증 포인트',
    value: '이메일 인증 후 로그인',
    copy: '가입을 허용하더라도 실제 대시보드 접근은 이메일 인증을 마친 뒤에만 열리도록 설계합니다.',
  },
  {
    label: '후속 동선',
    value: '인증 화면으로 자연스럽게 이동',
    copy: '성공 직후 바로 인증이나 대기 상태 화면으로 넘어가게 하면 사용자가 현재 단계를 놓치지 않습니다.',
  },
]

export function RegisterPage({ preview = false }) {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    displayName: 'Yang Theory',
    email: 'admin@observer.local',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    if (preview) {
      setSuccessMessage('회원가입 프리뷰 화면입니다. 실제 API 요청은 실행하지 않습니다.')
      return
    }

    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = await registerAccount({
        displayName: formState.displayName,
        email: formState.email,
        password: formState.password,
      })

      navigate('/verify-email', {
        state: {
          email: formState.email,
          notice: payload.message,
          debugCode: payload.debugCode,
        },
      })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Observer Account Creation"
      title="운영 계정 등록은 설명이 먼저 보이고, 입력은 그 다음에 오도록 설계합니다."
      description="회원가입 화면은 단순히 필드를 채우는 곳이 아니라, 어떤 권한을 요청하는지와 승인 이후 어떤 단계가 이어지는지를 이해시키는 첫 화면입니다."
      summaryItems={summaryItems}
    >
      <RegisterForm
        formState={formState}
        errorMessage={errorMessage}
        successMessage={successMessage}
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  )
}
