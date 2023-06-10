
const priceSpecs = {
    pricePerSqrMeter: 100,
    roomPriceMultiplier: 1.5,
    parkingSpaceAdditional: 50,
    commission: 0.1,
  };
  
  const property = {
    id: 0,
    address: '',
    m2: 0,
    getPrice() {
      return this.m2 * priceSpecs.pricePerSqrMeter;
    },
    getCommission() {
      return this.getPrice() * priceSpecs.commission;
    },
  };
  
  const house = Object.create(property);
  house.roomQtty = 0;
  house.getPrice = function() {
    return this.m2 * priceSpecs.pricePerSqrMeter * this.roomQtty * priceSpecs.roomPriceMultiplier;
  };
  
  const service = {
    price: 0,
  };
  
  const office = Object.create(property);
  office.services = [];
  office.getPrice = function() {
    const servicesPrice = this.services.reduce((sum, service) => sum + service.price, 0);
    return this.m2 * priceSpecs.pricePerSqrMeter + servicesPrice;
  };
  
  const garage = Object.create(property);
  garage.parkingSpace = 0;
  garage.getPrice = function() {
    return this.m2 * priceSpecs.pricePerSqrMeter + this.parkingSpace * priceSpecs.parkingSpaceAdditional;
  };
  
  const owner = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    properties: [],
  };
  
  function createHouse() {
    const newHouse = Object.create(house);
    newHouse.id = prompt('Ingrese el ID de la casa:');
    newHouse.address = prompt('Ingrese la dirección de la casa:');
    newHouse.m2 = parseFloat(prompt('Ingrese los metros cuadrados de la casa:'));
    newHouse.roomQtty = parseInt(prompt('Ingrese la cantidad de habitaciones de la casa:'));
    
    owner.properties.push(newHouse);
    
    console.log('Casa creada:', newHouse);
  }
  
  function createService(myPrice) {
    const newService = Object.create(service);
    newService.price = myPrice;
    
    return newService;
  }
  
  function createOffice() {
    const newOffice = Object.create(office);
    newOffice.id = prompt('Ingrese el ID de la oficina:');
    newOffice.address = prompt('Ingrese la dirección de la oficina:');
    newOffice.m2 = parseFloat(prompt('Ingrese los metros cuadrados de la oficina:'));
    
    let addService = true;
    while (addService) {
      const servicePrice = parseFloat(prompt('Ingrese el precio de un servicio (o ingrese 0 para terminar):'));
      if (servicePrice === 0) {
        addService = false;
      } else {
        const newService = Object.create(service);
        newService.price = servicePrice;
        newOffice.services.push(newService);
      }
    }
    
    owner.properties.push(newOffice);
    
    console.log('Oficina creada:', newOffice);
  }
  
  function createGarage() {
    const newGarage = Object.create(garage);
    newGarage.id = prompt('Ingrese el ID del garaje:');
    newGarage.address = prompt('Ingrese la dirección del garaje:');
    newGarage.m2 = parseFloat(prompt('Ingrese los metros cuadrados del garaje:'));
    newGarage.parkingSpace = parseInt(prompt('Ingrese la cantidad de espacios de estacionamiento del garaje:'));
    
    owner.properties.push(newGarage);
    
    console.log('Garaje creado:', newGarage);
  }
  
  // Crear propiedades
  createHouse();
  createService();
  createOffice();
  createGarage();
  
  // Calcular y mostrar el precio total
  let totalPrice = 0;
  for (const property of owner.properties) {
    totalPrice += property.getPrice();
  }
  
  console.log('Precio total:', totalPrice);
  
  