interface FormsProps {
  forms: any[];
}

const formState: { [key: string]: JSX.Element | string } = {
  active: <b className="text-success">Active</b>,
  inactive: <b className="text-danger">Inactive</b>,
};

const Forms: React.FC<FormsProps> = ({ forms }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th>id</th>
            <th>State</th>
            <th>Link</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created on</th>
            <th>Expires on</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.length ? (
            <>
              {forms.map((row: any, index: number) => (
                <tr key={row.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      title="View Submissions"
                      href={`form/${row.id}/submissions/`}
                    >
                      {row.id}
                    </a>
                  </td>
                  <td>{formState[row.form_state]}</td>
                  <td>
                    <a target="_blank" href={`form/${row.id}/`}>
                      View
                    </a>
                  </td>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{new Date(row.created_at).toDateString()}</td>
                  <td>
                    {row.decay_date
                      ? new Date(row.decay_date).toDateString()
                      : "N/A"}
                  </td>
                  <td className="d-flex gap-3">
                    <a href={`form/edit/${row.id}`}>
                      <i className="fa fa-edit" title="Edit"></i>
                    </a>
                    <a
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this form?")
                        ) {
                          window.location.href = `forms/delete/${row.id}`;
                        }
                      }}
                      href={"#"}
                    >
                      <i className="fa fa-trash" title="Delete"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td className="text-center" colSpan={9}>
                No forms found, feel free to create one
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Forms;
