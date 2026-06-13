import { requireRole } from "@/lib/api/core/session"

const RecruiterLayout = async({children}) => {
    await requireRole('recruiter')
  return children

}

export default RecruiterLayout