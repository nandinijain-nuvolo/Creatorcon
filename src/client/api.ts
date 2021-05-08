import { getClient } from "./ClientWrapper";

export const testapi = async (): Promise<string> => {
  const endpoint =
    "/api/x_nuvo_sn_voice/servicenow_voice/test";
  return await getClient().get(endpoint);
};
