// detector of changes
let latitudeVal = {
    latitudeInternal: latitude,
    latitudeListener: function(val) {},
    set latitude(val) {
        this.latitudeInternal = val;
        this.latitudeListener(val);
    },
    get latitude() {
        return this.latitudeInternal;
    },
    registerListener: function(listener) {
        this.latitudeInternal = listener;
    }
}

// exe
latitudeVal.registerListener(function(val) {