import { Suspense, lazy } from "react";
import { Header } from "../../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/store";

const Forms = lazy(() => import("./sections/Forms"));

const Home: React.FC = () => {
  const forms = useSelector((state: RootState) => state.forms);
  const isClient = useSelector((state: RootState) => state.isClient);

  return (
    <>
      <Header />
      <div className="p-2">
        <h2>Your Forms</h2>
        {isClient && (
          <Suspense fallback={<div>Loading forms...</div>}>
            <Forms forms={forms} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Home;
