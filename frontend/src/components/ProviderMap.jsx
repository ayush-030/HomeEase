import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default function ProviderMap({ providers }) {

  return (

    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {providers.map((p) => (

        <Marker
          key={p.provider_id}
          position={[p.latitude || 28.61, p.longitude || 77.20]}
        >

          <Popup>
            {p.bio}
          </Popup>

        </Marker>

      ))}

    </MapContainer>

  )
}