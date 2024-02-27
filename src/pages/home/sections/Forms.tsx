interface FormsProps {
  forms: any[];
}

const Forms: React.FC<FormsProps> = ({ forms }) => {
  return (
    <>
      {forms.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>id</th>
              <th>title</th>
              <th>description</th>
              <th>created at</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((row: any, index: number) => (
              <tr key={row.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`form/${row.id}/submissions/`}>{row.id}</a>
                </td>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{new Date(row.created_at).toDateString()}</td>
                <td className="d-flex gap-3">
                  <a href={`form/edit/${row.id}`}>
                    <i className="fa fa-edit" title="Edit"></i>
                  </a>
                  <a href={`form/delete/${row.id}`}>
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
