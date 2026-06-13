import { getApplicationByApplicant } from '@/lib/api/applications'
import { getUserSession } from '@/lib/api/core/session'
import { Table } from '@heroui/react'

const statusColor = {
    pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    reviewed: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
    accepted: "bg-green-500/10 text-green-400 border border-green-500/20",
}

const SeekerApplicationPage = async () => {
    const user = await getUserSession()
    const applications = await getApplicationByApplicant(user?.id)

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-6">My Applications</h1>

            {applications.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
                    <p className="text-zinc-500">You haven't applied to any jobs yet.</p>
                </div>
            ) : (
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Applications table" classNames={{
                            wrapper: "bg-zinc-900 border border-zinc-800 rounded-2xl",
                            th: "bg-zinc-800 text-zinc-400 text-xs uppercase",
                            td: "text-zinc-300 py-4",
                            tr: "border-b border-zinc-800 hover:bg-zinc-800/50 transition",
                        }}>
                            <Table.Header>
                                <Table.Column isRowHeader>Job Title</Table.Column>
                                <Table.Column>Company</Table.Column>
                                <Table.Column>Phone</Table.Column>
                                <Table.Column>Applied At</Table.Column>
                                <Table.Column>Status</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {applications.map((app) => (
                                    <Table.Row key={app._id}>
                                        <Table.Cell className="text-white font-medium">{app.jobTitle}</Table.Cell>
                                        <Table.Cell>{app.companyName}</Table.Cell>
                                        <Table.Cell>{app.phone}</Table.Cell>
                                        <Table.Cell>
                                            {new Date(app.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[app.status] ?? statusColor.pending}`}>
                                                {app.status ?? "Pending"}
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            )}
        </div>
    )
}

export default SeekerApplicationPage