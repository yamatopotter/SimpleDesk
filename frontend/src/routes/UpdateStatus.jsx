import { useNavigate, useParams } from "react-router-dom";
import { UpdStatus } from "../pages/Update/UpdStatus";
import { useEffect, useState } from "react";
import { getWorkflow } from "../functions/workflowManagement";
import { getStatus } from "../functions/statusManagement";
import { LoadingComponent } from "../components/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";

export const UpdateStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [workflowData, setWorkflowData] = useState({});
  const [statusData, setStatusData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const auxStatus = await getStatus(id);

        if (auxStatus == null) {
          toast.error(
            "Houve um erro no carregamento dos dados, tente novamente.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setIsLoading(false);
          navigate("/status");
        }

        setStatusData(auxStatus);
        setWorkflowData(await getWorkflow());
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        toast.error(
          "Houve um erro no carregamento dos dados, tente novamente.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setIsLoading(false);
        navigate("/status");
      }
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <UpdStatus status={statusData} workflow={workflowData} />
    </LoadingComponent>
  );
};
