
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CompanyView } from '@/app/dashboard/recruiter/company/CompanyView'
import { NoCompanyView } from '@/app/dashboard/recruiter/company/NoCompanyView'
import { CompanyForm } from '@/app/dashboard/recruiter/company/CompanyForm'


export default function CompanyProfile({ recruiterCompany, recruiter }) {
  const router = useRouter()
  const [company, setCompany] = useState(recruiterCompany ?? null)
  const [mode, setMode] = useState('view') // 'view' | 'register' | 'edit'

  if (mode === 'register' || mode === 'edit') {
    return (
      <CompanyForm
        existing={mode === 'edit' ? company : null}
        recruiter={recruiter}
        onSuccess={(saved) => {
          setCompany(saved)
          setMode('view')
          router.refresh()
        }}
        onCancel={() => setMode('view')}
      />
    )
  }

  if (company?._id) {
    return <CompanyView company={company} onEdit={() => setMode('edit')} />
  }

  return <NoCompanyView onRegister={() => setMode('register')} />
}