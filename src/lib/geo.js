export default class Geo {
    constructor(city) {
        this.city = city;
        this.geocoder = null;
    }

    register(plugin) {
        return new Promise((resolve) => {
            AMap.plugin(plugin, () => {
                resolve();
            });
        });
    }

    getLocation(address) {
        return this.register('AMap.Geocoder')
            .then(() => new Promise((resolve, reject) => {
                // init Geocoder
                this.geocoder = new AMap.Geocoder({
                    city: this.city || '上海'
                });

                this.geocoder.getLocation(address, (status, result) => {
                    if (status === 'complete' && result.geocodes.length) {
                        resolve(result);
                    } else {
                        reject('获取经纬度失败');
                    }
                })
            }))
    }
}

