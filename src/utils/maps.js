import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {
    
    function setMapViewBounds(map){
        var bbox = new H.geo.Rect(27.5480,80.6590,27.5880,80.6990);
        map.getViewModel().setLookAtData({
          bounds: bbox
        });
      }

      
      function addMarkersToMap(map) {
       // var icon = new H.map.Icon("https://f0.pngfuel.com/png/731/25/location-icon-png-clip-art.png");

        var parisMarker = new H.map.Marker({lat:27.5580, lng:80.6690});
        map.addObject(parisMarker);
    
        var romeMarker = new H.map.Marker({lat:27.5680, lng: 80.6890});
        map.addObject(romeMarker);
    
    }
    
    
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "P0aQETvr-bp9pKcvdjLEH5HPjP9GZ8yFlhy8gYZd6EQ"
    });


    const defaultLayers = platform.createDefaultLayers();




    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 20, lng: 78 },
        zoom: 6,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
console.log(navigator.geolocation)

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            map.center({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            map.addObject(new H.map.Marker({lat: position.coords.latitude, lng: position.coords.longitude}));
          console.log(position.coords);
        });
      } else {
        console.error("Geolocation is not supported by this browser!");
      }
    
    
    window.addEventListener('resize', () => map.getViewPort().resize());

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);

    var service = platform.getSearchService();
    service.geocode({
        q: 'Eye hospital Civil Lines, Prem Nagar, Sitapur, Uttar Pradesh'
      }, (result) => {
        // Add a marker for each location found
        result.items.forEach((item) => {
          map.addObject(new H.map.Marker(item.position));
          console.log(item)
          
          ui.addBubble(new H.ui.InfoBubble(item.position, {
            content: item.address.label
          }))   

        });
      }, alert);

    this.setState({ map });
    setMapViewBounds(map);
    addMarkersToMap(map) ;
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}