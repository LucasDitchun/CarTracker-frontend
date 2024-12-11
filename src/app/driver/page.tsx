import { RouteModel } from "../../utils/models";
import { MapDriver } from "./_component/MapDriver";

export async function getRoutes() {
  const response = await fetch("http://localhost:3000/routes", {
    cache: "force-cache",
    next: {
      tags: ["routes"],
    },
  });
  return response.json();
}

export async function DriverPage() {
  const routes = await getRoutes();
  return (
    <div className="flex h-screen w-full flex-1">
      <div className="h-full w-1/3 p-2">
        <h4 className="mb-2 text-3xl text-contrast">Inicie uma rota</h4>
        <div className="flex flex-col">
          <form className="flex flex-col space-y-4">
            <select className="mb-2 rounded border bg-default p-2 text-contrast">
              {routes.map((route: RouteModel) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
            <button
              className="rounded bg-main p-2 text-xl font-bold text-primary"
              style={{ width: "100%" }}
            >
              Iniciar a viagem
            </button>
          </form>
        </div>
      </div>
      <MapDriver />
    </div>
  );
}

export default DriverPage;
