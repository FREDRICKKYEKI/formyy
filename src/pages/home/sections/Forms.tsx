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
      {forms.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>id</th>
              <th>State</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created on</th>
              <th>Expires on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
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
                  <a href={`forms/delete/${row.id}`}>
                    <i className="fa fa-trash" title="Delete"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <i>You dont have any forms yet. Please create some</i>
      )}
    </>
  );
};

export default Forms;
