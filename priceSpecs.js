const priceSpecs = {
    pricePerSqrMeter,
    roomPriceMultiplier,
    parkingSpaceAdditional,
    commission
};

const property = {
    id,
    address,
    m2,
    getPrice() {

    },
    getCommision(commission) {
        return getPrice()*commission
    },
};


const house = {
    __proto__: property,
    roomQtty,
    getPrice(pricePerSqrMeter,roomPriceMultiplier) {   
        m2*pricePerSqrMeter*roomQtty*roomPriceMultiplier
    },
};

const service = {
    price,
};

const office = {
    __proto__: property,
    services = [],
    getPrice(pricePerSqrMeter) {   
        m2*pricePerSqrMeter + sum(services.price)
    },
};

const garage = {
    __proto__: property,
    parkingSpace,
    getPrice(pricePerSqrMeter,parkingSpaceAdditional) {   
        m2*pricePerSqrMeter + parkingSpace*parkingSpaceAdditional
    },
};



const owner = {
    id,
    firstName,
    lastName,
    email,
    properties = [],
};



