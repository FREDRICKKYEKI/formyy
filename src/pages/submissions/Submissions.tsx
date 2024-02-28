import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header";
import { Modal } from "react-responsive-modal";

interface SubmissionsProps {}

const Submissions: React.FC<SubmissionsProps> = () => {
  const form = useSelector((state: any) => state.form);
  const isClient = useSelector((state: any) => state.isClient);
  const [open, setOpen] = useState(false);
  const [clickedSubmission, setClickedSubmission] = useState<any>(null);

  function handleViewForm(submission: any): void {
    setOpen(true);
    setClickedSubmission(submission);
  }

  return (
    <div>
      <Header />
      <h3>Submissions</h3>
      {isClient && (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Submission ID</th>
                  <th>User id</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {form?.Submissions.map((submission: any) => (
                  <tr key={submission.id}>
                    <td>{submission.id}</td>
                    <td>{submission.user_id}</td>
                    <td>{new Date(submission.created_at).toDateString()}</td>
                    <td className="d-flex gap-3">
                      <a href="#" onClick={() => handleViewForm(submission)}>
                        View
                      </a>
                      <a
                        href={`/forms/${form.id}/submissions/${submission.id}/delete`}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
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
