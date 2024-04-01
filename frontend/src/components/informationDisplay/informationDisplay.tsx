import { Information } from "@/interfaces/InformationDisplay";
import { Separator } from "../ui/separator";

export function InformationDisplay(props: { data: Information[] }) {
  const { data } = props;

  return (
    <div className="container grid gap-12">
      {data.map((dataToShow) => {
        return (
          <div key={dataToShow.title} className="grid gap-4">
            <div>
              <h1 className="font-bold uppercase text-3xl">
                {dataToShow.title}
              </h1>
              <Separator />
            </div>
            <div>
              {dataToShow.content.map((infoToshow, index) => {
                return <p key={index}>{infoToshow}</p>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
