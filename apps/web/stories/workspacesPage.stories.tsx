import { Index, GET_WORKSPACES } from "../pages/workspaces/index";


export default {
  title: "Pages/Workspaces",
  component: Index,
};


export const WorkspacesPageComponent = () => <Index />

WorkspacesPageComponent.parameters = {
    apolloClient: {
      mocks: [
        {
          request: {
            query: GET_WORKSPACES,
          },
          result: {
            data: {
              viewer: null,
            },
          },
        },
      ],
    },
  };