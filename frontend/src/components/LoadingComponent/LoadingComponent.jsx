import { Spinner } from "../Spinner/Spinner";

export const LoadingComponent = (props) => {
  if (props.isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <div role="status">
          <Spinner />
          <span className="sr-only">Carregando...</span>
        </div>
      </div>
    );
  }

  return props.children;
};
