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

export async function getRoute(route_id: string): Promise<RouteModel> {
  const response = await fetch(`http://localhost:3000/routes/${route_id}`, {
    cache: "force-cache",
    next: {
      tags: [`routes-${route_id}`, "routes"],
    },
  });
  return response.json();
}

export async function DriverPage({
  searchParams,
}: {
  searchParams: Promise<{ route_id: string }>;
}) {
  const routes = await getRoutes();
  const { route_id } = await searchParams;
  let start_location = null;
  let end_location = null;
  if (route_id) {
    const route = await getRoute(route_id);
    const leg = route.directions.routes[0].legs[0];
    start_location = {
      lat: leg.start_location.lat,
      lng: leg.start_location.lng,
    };
    end_location = {
      lat: leg.end_location.lat,
      lng: leg.end_location.lng,
    };
  }
  return (
    <div className="flex h-full w-full flex-1">
      <div className="h-full w-1/3 p-2">
        <h4 className="mb-2 text-3xl text-contrast">Inicie uma rota</h4>
        <div className="flex flex-col">
          <form className="flex flex-col space-y-4" method="get">
            <select
              name="route_id"
              className="mb-2 rounded border bg-default p-2 text-contrast"
            >
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
      <MapDriver
        route_id={route_id}
        start_location={start_location}
        end_location={end_location}
      />
    </div>
  );
}

export default DriverPage;
