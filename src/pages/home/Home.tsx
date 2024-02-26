import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { serverUrl } from "../../utils";

const Home: React.FC = () => {
  const [forms, setForms] = useState<any>([]);

  useEffect(() => {
    fetch(serverUrl + "/forms/my-forms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data: any) => {
        setForms(data.forms);
      })
      .catch((_e) => {
        console.log("Something went wrong !");
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <h2>Your Forms</h2>
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
      </div>
    </>
  );
};

export default Home;
