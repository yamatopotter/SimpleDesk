import { useNavigate, useParams } from "react-router-dom";
import { UpdStatus } from "../../pages/Update/UpdStatus";
import { useEffect, useState } from "react";
import { getWorkflow } from "../../functions/workflowManagement";
import { getStatus } from "../../functions/statusManagement";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { transformToWorkflowOptions } from "../../functions/common";
import { Container } from "../../components/Container";

export const UpdateStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [workflowData, setWorkflowData] = useState({});
  const [statusData, setStatusData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const auxStatus = await getStatus(id);
      const auxWorkflow = await getWorkflow();

      if (auxStatus && auxWorkflow) {
        setStatusData(auxStatus);
        setWorkflowData(transformToWorkflowOptions(auxWorkflow));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/status");
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container>
        <UpdStatus
          status={statusData}
          workflow={workflowData}
          navigate={navigate}
        />
      </Container>
    </LoadingComponent>
  );
};
