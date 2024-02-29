import { Suspense } from "react";
import { Header } from "../../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/store";
import Forms from "./sections/Forms";

const Home: React.FC = () => {
  const forms = useSelector((state: RootState) => state.forms);
  const isClient = useSelector((state: RootState) => state.isClient);

  return (
    <>
      <Header />
      <div className="p-2">
        {isClient && (
          <>
            {JSON.parse(localStorage.getItem("userInfo") || "{}")?.email}
            <h3>Your Forms</h3>
            <Suspense fallback={<div>Loading forms...</div>}>
              <Forms forms={forms} />
            </Suspense>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
