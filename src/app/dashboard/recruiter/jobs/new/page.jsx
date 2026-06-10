import PostJobPage from '@/app/dashboard/recruiter/jobs/new/PostJobPage'
import { getLoggedInRecruiterCompany } from '@/lib/api/companies'
import React from 'react'

const PostJob = async() => {
    const company = await getLoggedInRecruiterCompany()
  
  return (
    <div>
        <PostJobPage company={company}/>

        
    </div>
  )
}

export default PostJob