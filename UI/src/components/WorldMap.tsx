import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ onCountryClick, onHover, onLeave, onMouseMove }) {
    return (
        <ComposableMap onMouseMove={onMouseMove}>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => onHover(geo.properties.name)}
                            onMouseLeave={onLeave}
                            onClick={() => onCountryClick(geo.properties)}
                            style={{
                                default: { fill: "#D6D6DA", outline: "none" },
                                hover: { fill: "#F53", cursor: "pointer" },
                                pressed: { fill: "#E42" },
                            }}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    );
}
