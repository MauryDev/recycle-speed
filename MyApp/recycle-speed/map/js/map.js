{
    let baseMapLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    let map = new ol.Map({
        target: 'map',
        layers: [ baseMapLayer],
        view: new ol.View({
            center: ol.proj.fromLonLat([-39.2610632,-12.9732558]), 
            zoom: 14
        })
    });
    let markers = (loc) => {
        let t1 = performance.now();
        let marker_ = [];
        for (let i in loc) {
            let ii = loc[i];
            marker_.push(new ol.Feature({
                geometry: new ol.geom.Point(
                    ol.proj.fromLonLat([ii[0],ii[1]])
                ),
            }));
        }
        let vectorSource_ = new ol.source.Vector({
            features: marker_
        });
        var t2 = performance.now();
        console.log(t2-t1);
        return new ol.layer.Vector({
            source: vectorSource_,
        });
    }
    map.addLayer(markers({
        "0": [-39.2610632,-12.9732558],
        "1": [-38.2610632,-12.9732558]
    }));
    var data = map.values_.view.values_;
}
