import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/main/MainLayout";
import { Home } from "./pages/Home/Home";
import { InformationDisplay } from "./components/informationDisplay/informationDisplay.tsx";
import { content } from "./data/data.ts";
import { JwtComponent } from "./pages/jwt/Jwt.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        children: [
          {
            index: true,
            element: <InformationDisplay data={content.home} />,
          },
          {
            path: "usage",
            element: <InformationDisplay data={content.usage} />,
          },
          {
            path: "architecture",
            element: <InformationDisplay data={content.architecture} />,
          },
          {
            path: "crudOperations",
            element: <InformationDisplay data={content.crudOperations} />,
          },
          {
            path: "authentication",
            element: <InformationDisplay data={content.authentication} />,
          },
          {
            path: "deploy",
            element: <InformationDisplay data={content.deploy} />,
          },
        ],
      },
      {
        path: "/*",
        element: <JwtComponent />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
