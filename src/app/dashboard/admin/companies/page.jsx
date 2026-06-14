import { getAllCompanies } from '@/lib/api/companies'
import AdminCompaniesClient from './AdminCompaniesClient'

const AdminCompaniesPage = async () => {
    const companies = await getAllCompanies()
    return <AdminCompaniesClient companies={companies} />
}

export default AdminCompaniesPage