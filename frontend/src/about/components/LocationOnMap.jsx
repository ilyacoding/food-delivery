import React from "react";

class LocationOnMap extends React.Component {
    render() {
        return (
            <iframe className="description__company-location-map" src="https://yandex.by/map-widget/v1/-/CBQHFKRWwD"
                frameBorder="0" alt="Location"></iframe>
        );
    }
}

export default LocationOnMap;