let properties = [];
const priceSpecs = {
  pricePerSqrMeter: 100,  
  roomPriceMultiplier: 1.5,  
  parkingSpaceAdditional: 50,
  commission: 0.1,
};

const property = {
  id: null,
  address: null,
  m2: null,
  owner: null,
  getPrice() {
  },
  getCommission() {
    return this.getPrice() * priceSpecs.commission;
  },
};

const house = Object.create(property);
house.roomQtty = null;
house.getPrice = function () {
  return this.m2 * priceSpecs.pricePerSqrMeter * this.roomQtty * priceSpecs.roomPriceMultiplier;
};

const service = {
  price: 0,
};

const office = Object.create(property, {
  services: { value: [] },
  getPrice: {
    value: function() {
      const servicesPrice = this.services.reduce((sum, service) => sum + service.price, 0);
      return this.m2 * priceSpecs.pricePerSqrMeter + servicesPrice;
    }
  }
});

const garage = Object.create(property, {
  parkingSpace: { value: 0 },
  getPrice: {
    value: function() {
      return this.m2 * priceSpecs.pricePerSqrMeter + this.parkingSpace * priceSpecs.parkingSpaceAdditional;
    }
  }
});

const owner = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

// data of my owner
const myOwner = Object.create(owner);
myOwner.id = 1;
myOwner.firstName = 'Adam';
myOwner.lastName = 'Bareiro';
myOwner.email = 'adam9@gmail.com';

// instantiate properties...
// -----instance of house------
const house1 = Object.create(house);
house1.id = 1;
house1.address = 'Tucuman 380';
house1.m2 = 150;
house1.roomQtty = 3;
house1.owner = myOwner;

properties.push(house1);

// -----instance of office------
const office1 = {
  __proto__: office,
  id : 2,
  address : 'Av. La Plata 1700',
  m2 : 200,
  owner : myOwner,
  services : [],
};
// instance of services
const service1 = Object.create(service, {
  price: { value: 50 }
});

const service2 = Object.create(service, {
  price: { value: 30 }
});
// add services to the office
office1.services.push(service1,service2);

properties.push(office1);

// ----instance of garage----
const myOwner2 = Object.create(owner);
myOwner2.id = 1;
myOwner2.firstName = 'Viggo';
myOwner2.lastName = 'Mortensen';
myOwner2.email = 'aragorn@gmail.com';

const garage1 = Object.create(garage, {
  id: { value: 3 },
  address: { value: 'Francia 230' },
  m2: { value: 100 },
  owner: { value: myOwner2},
  parkingSpace: { value: 2 }
});
properties.push(garage1);

const office2 = {
  __proto__: office,
  id : 4,
  address : 'Av. La Plata 1700',
  m2 : 120,
  owner : myOwner2,
  services : [],
};
// instance of services
const service3 = Object.create(service, {
  price: { value: 10 }
});

office2.services.push(service3);

properties.push(office2);

// calculate commissions for each property
for (const p of properties) {
  const prototype_p = Object.getPrototypeOf(p);
  const comission_p = p.getCommission();

  console.log(
    p.id,'-'
    ,p.owner.getFullName(),'>>>'
    ,prototype_p === house ? 'House' : prototype_p === office ? 'Office' : prototype_p === garage ? 'Garage' : ''
    ,'>>> $',comission_p
    );
};

