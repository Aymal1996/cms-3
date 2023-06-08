import authInterceptors from './axiosInterceptor';

export const getTeamUpdates = () => {
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  return authInterceptors.get(
    `https://cms2dev.limkokwing.net/api/method/marketing.api.get_message?doc_name=AP000160&start_date=2021-01-01&end_date=${date}`,
  );
};
