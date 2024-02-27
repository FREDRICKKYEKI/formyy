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
              <th>id</th>
              <th>title</th>
              <th>description</th>
              <th>created at</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((row: any) => (
              <tr>
                <td>
                  <a href={`form/edit/${row.id}`}>{row.id}</a>
                </td>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{row.created_at}</td>
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
