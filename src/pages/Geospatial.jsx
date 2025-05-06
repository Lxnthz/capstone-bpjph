import MapView from "../components/MapView";

export default function Geospatial() {
  return (
    <section className="flex flex-1 flex-col h-screen py-10 mx-auto ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Geospatial Data</h1>
      </div>
      <div className="">
        <MapView />
      </div>
      <div className="flex justify-between">
        <div className=" bg-amber-100">
          <h1 className="text-3xl font-bold mb-4">Geospatial Data</h1>
          <p className="text-gray-700">Explore geospatial data visualizations.</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Statistics</h1>
          <p className="text-gray-700">Learn more about our website and mission.</p>
        </div>
      </div>
    </section>
  );
}