import DeleteJobButton from '@/Components/common/DeleteJobButton';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import { getCompanyJobs } from '@/lib/api/jobs'
import { getUserSession } from '@/lib/core/session';
import { Chip, Table, Button } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const RecruiterJobs = async () => {
  const recruiterCompany = await getLoggedInRecruiterCompany()
  const companyId = recruiterCompany._id
  const jobs = await getCompanyJobs(companyId)
  console.log('jobs',jobs)

  return (
    <div>RecruiterJobs
      <Table>
        <Table.ResizableContainer>
          <Table.Content aria-label="Table with resizable columns" className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="1fr" id="title" minWidth={160}>
                Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="category" minWidth={220}>
                Category
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="companyId" minWidth={200}>
                Company Name
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="actions" minWidth={200}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs.map(({ _id, title, status, jobType, category,companyName }) => (
                <Table.Row key={_id}>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{category}</Table.Cell>
                  <Table.Cell>
                    <Chip
                      color={status === 'active' ? 'success' : status === 'paused' ? 'warning' : 'danger'}
                      size="sm"
                      variant="soft"
                    >
                      {status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>{companyName}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        as="a"
                        href={`/dashboard/recruiter/jobs/${_id}`}
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        aria-label="View job"
                      >
                        <FiEye size={16} />
                      </Button>
                      <Button
                        as="a"
                        href={`/dashboard/recruiter/jobs/${_id}/edit`}
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="warning"
                        aria-label="Edit job"
                      >
                        <FiEdit2 size={16} />
                      </Button>
                      <DeleteJobButton
                        
                        jobId={_id}
                      >
                      </DeleteJobButton>
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

export default RecruiterJobs