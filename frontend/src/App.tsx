import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/main/MainLayout";
import { Home } from "./pages/Home/Home";
import { InformationDisplay } from "./components/informationDisplay/informationDisplay.tsx";
import { content } from "./data/data.ts";

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
            path: "/usage",
            element: <InformationDisplay data={content.usage} />,
          },
          {
            path: "/architecture",
            element: <InformationDisplay data={content.architecture} />,
          },
          {
            path: "/front",
            element: <InformationDisplay data={content.front} />,
          },
          {
            path: "/deploy",
            element: <InformationDisplay data={content.deploy} />,
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
