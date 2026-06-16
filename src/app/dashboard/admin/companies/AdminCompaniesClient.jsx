'use client'
import { useState } from 'react'
import { Button, Chip, Table, toast } from '@heroui/react'
import { updateCompany } from '@/lib/actions/companies'

const AdminCompaniesClient = ({ companies: initial }) => {
    const [companies, setCompanies] = useState(initial)

    const handleApprove = async (id) => {
        const result = await updateCompany(id, { status: 'Approved' })
        if (result?.modifiedCount) {
            setCompanies(prev =>
                prev.map(c => c._id === id ? { ...c, status: 'Approved' } : c)
            )
            toast.success('Company Approved', { timeout: 1500 })
        }
    }

    const handleReject = async (id) => {
        const result = await updateCompany(id, { status: 'Rejected' })
        if (result?.modifiedCount) {
            setCompanies(prev =>
                prev.map(c => c._id === id ? { ...c, status: 'Rejected' } : c)
            )
            toast.danger('Company Rejected', { timeout: 1500 })
        }
    }

    return (
        <div>
            <h1>Companies for review</h1>

            <Table>
                <Table.ResizableContainer>
                    <Table.Content aria-label="Companies table" className="min-w-[700px]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="1fr" id="name" minWidth={160}>
                                Company Name <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="recruiterEmail" minWidth={220}>
                                Recruiter Email <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="industry" minWidth={100}>
                                Industry <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="jobCount" minWidth={50}>
                                Job Count
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={200}>
                                Status
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="createdAt" minWidth={200}>
                                Date Submitted
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="actions" minWidth={200}>
                                Actions <Table.ColumnResizer />
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {companies.map(({ _id, name, status, recruiterEmail, createdAt, industry, jobCount }) => (
                                <Table.Row key={_id}>
                                    <Table.Cell>{name}</Table.Cell>
                                    <Table.Cell>{recruiterEmail}</Table.Cell>
                                    <Table.Cell>{industry}</Table.Cell>
                                    <Table.Cell>{jobCount}</Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${
                                                status === 'Approved' ? 'bg-green-500' :
                                                status === 'Rejected' ? 'bg-red-500' :
                                                'bg-yellow-500'
                                            }`} />
                                            <Chip
                                                color={
                                                    status === 'Approved' ? 'success' :
                                                    status === 'Rejected' ? 'danger' :
                                                    'warning'
                                                }
                                                size="sm"
                                                variant="soft"
                                            >
                                                {status}
                                            </Chip>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {new Date(createdAt).toLocaleDateString('en-GB', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            {status !== 'Approved' && (
                                                <Button
                                                    onPress={() => handleApprove(_id)}
                                                    size="sm"
                                                    color="success"
                                                    className="bg-green-700"
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            {status !== 'Rejected' && (
                                                <Button
                                                    onPress={() => handleReject(_id)}
                                                    size="sm"
                                                    variant='danger'
                                                >
                                                    Reject
                                                </Button>
                                            )}
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    )
}

export default AdminCompaniesClient