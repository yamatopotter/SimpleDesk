import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { transformToWorkflowOptions } from "../../functions/common";
import { getWorkflow } from "../../functions/workflowManagement";
import { AddStatus } from "../../pages/Create/AddStatus";

export const CreateStatus = () => {
  const [workflow, setWorkflow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const workflowData = await getWorkflow();

      if (workflowData) {
        setWorkflow(transformToWorkflowOptions(workflowData));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <AddStatus workflow={workflow} />
    </LoadingComponent>
  );
};
