import CompanyProfile from '@/app/dashboard/recruiter/company/CompanyProfile'
import { getRecruiterCompany } from '@/lib/api/companies'
import { getUserSession } from '@/lib/api/core/session'
import React from 'react'

const CompanyPage = async () => {
  const user = await getUserSession()
  const company = await getRecruiterCompany(user?.id)
  console.log(company)
  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  )
}

export default CompanyPage