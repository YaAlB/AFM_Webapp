import { useGetApplicationsQuery } from "./applicationsApiSlice";
import Application from "./Application";

const ApplicationsList = () => {
  const {
    data: applications,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetApplicationsQuery("applicationsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = applications;

    const applicationContent = ids?.length
      ? ids.map((applicationId) => (
          <Application key={applicationId} applicationId={applicationId} />
        ))
      : null;

    content = <div className="containerCard">{applicationContent}</div>;
  }

  return content;
};
export default ApplicationsList;
