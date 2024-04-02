import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/main/MainLayout";
import { Home } from "./pages/Home/Home";
import { InformationDisplay } from "./components/informationDisplay/informationDisplay.tsx";
import { content } from "./data/data.ts";
import { JwtComponent } from "./pages/jwt/Jwt.tsx";
import ReactPlayer from "react-player";

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
          {
            path: "video",
            element: (
              <div className="grid gap-4">
                <ReactPlayer
                  className="max-w-64 md:max-w-lg lg:max-w-xl "
                  url={[{ src: "/VideoPruebaTecnica.mp4", type: "video/mp4" }]}
                  controls
                  volume={0.5}
                />
                <a href="https://drive.google.com/file/d/12p3zgvh9KDuVPKwAMIioTiBUhs6AnX2D/view?usp=drive_link">
                  Vídeo en Google drive
                </a>
              </div>
            ),
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
