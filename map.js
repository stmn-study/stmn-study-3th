function initMap() {
  'use strict';
  var mapElement = document.getElementById('google-map');
  if (!mapElement) {
    return
  }

  var map = new google.maps.Map(mapElement, {
    mapTypeId: 'roadmap'
  });

  var iw = new google.maps.InfoWindow();
  var LatLngBounds = new google.maps.LatLngBounds();

  $.getJSON("data.json", function(response) {
    for (var i = 0, data; data = response[i]; i++) {
      addMarker(data, 5);
    }
  });

  map.fitBounds(LatLngBounds);
  var listener = google.maps.event.addListener(map, 'idle', function () {
    if (map.getZoom() > 16) map.setZoom(16);
    google.maps.event.removeListener(listener);
  });

  function addMarker(data) {
    var image = {
      url: data['user']['path'],
      scaledSize: new google.maps.Size(35, 35)
    };
    var lat = Number(data['place']['position']['lat']);
    var lng = Number(data['place']['position']['lng']);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      icon: image,
      map: map
    });
    google.maps.event.addListener(marker, 'mouseover', function (e) {
      iw.setContent(data['place']['name']);
      iw.open(map, marker);
    });
    LatLngBounds.extend(marker.position);
  }
}
