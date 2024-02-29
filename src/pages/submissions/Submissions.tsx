import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header";
import { Modal } from "react-responsive-modal";
import { RootState } from "../../state-management/store";

interface SubmissionsProps {}

const Submissions: React.FC<SubmissionsProps> = () => {
  const submissions = useSelector((state: RootState) => state.submissions);
  const form = submissions[0]?.form;
  const isClient = useSelector((state: RootState) => state.isClient);
  const [open, setOpen] = useState(false);
  const [clickedSubmission, setClickedSubmission] = useState<any>(null);

  function handleViewForm(submission: any): void {
    setOpen(true);
    setClickedSubmission(submission);
  }

  return (
    <div>
      <Header />
      {isClient && (
        <Suspense fallback={<div>Loading...</div>}>
          <h3 className="m-2">Submissions for form: {form?.id}</h3>
          <div className="container mx-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Submission ID</th>
                  <th>By</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length ? (
                  <>
                    {submissions?.map((submission: any) => (
                      <tr key={submission.id}>
                        <td>{submission.id}</td>
                        <td>{submission.User.email}</td>
                        <td>
                          {new Date(submission.created_at).toLocaleString()}
                        </td>
                        <td className="d-flex gap-3">
                          <a
                            href="#"
                            onClick={() => handleViewForm(submission)}
                          >
                            View
                          </a>
                          <a
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this submission?"
                                )
                              )
                                window.location.href = `/forms/${submission?.form_id}/submissions/${submission.id}/delete`;
                            }}
                            href={`#`}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No submissions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Suspense>
      )}
      <Modal
        styles={{ modal: { borderRadius: "10px", width: "500px" } }}
        open={open}
        onClose={() => setOpen(false)}
        center
      >
        <h4 className="m-0">{form?.title}</h4>
        <h5 className="mb-3">{form?.description}</h5>
        {clickedSubmission &&
          JSON.parse(decodeURIComponent(clickedSubmission.submission_data)).map(
            (element: any) => {
              return (
                <>
                  <strong>{element.label || element.placeholder}</strong>
                  <div className="mb-3">{element.value}</div>
                </>
              );
            }
          )}
      </Modal>
    </div>
  );
};

export default Submissions;
