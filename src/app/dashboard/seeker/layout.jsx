import { requireRole } from "@/lib/api/core/session"

const SeekerLayout = async({children}) => {
    await requireRole('seeker')
  return children

}

export default SeekerLayout