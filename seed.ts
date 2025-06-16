import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { AppDataSource } from "./data-source";
import { Room } from "./entities/Room";
import { Amenity } from "./entities/Amenity";
import { RoomAmenity } from "./entities/RoomAmenity";
import { User } from "./entities/User";
import { Booking } from "./entities/Booking";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedAmenities() {
  const amenitiesList = [
    "Wi-Fi",
    "TV",
    "Minibar",
    "Air Conditioning",
    "Safe",
    "Balcony",
    "Coffee Maker",
  ];
  const repo = AppDataSource.getRepository(Amenity);
  const existing = await repo.find();
  if (existing.length === 0) {
    const amenities = amenitiesList.map((name) => repo.create({ name }));
    await repo.save(amenities);
  }
}

async function seedRooms() {
  const roomRepo = AppDataSource.getRepository(Room);
  const amenityRepo = AppDataSource.getRepository(Amenity);
  const roomAmenityRepo = AppDataSource.getRepository(RoomAmenity);
  const allAmenities = await amenityRepo.find();

  const roomTypes = ["Single", "Double", "Suite"];
  const bedTypes = ["Single", "Double", "Queen", "King"];
  const cancellationPolicies = [
    "Free cancellation",
    "Non-refundable",
    "Partial refund",
  ];

  for (let i = 0; i < 50; i++) {
    const roomNumber = 100 + i;
    const room = roomRepo.create({
      roomNumber,
      roomType: faker.helpers.arrayElement(roomTypes),
      bedType: faker.helpers.arrayElement(bedTypes),
      roomFloor: `${randomInt(1, 5)}`,
      photos: JSON.stringify([
        faker.image.urlLoremFlickr({ category: "hotel" }),
        faker.image.urlLoremFlickr({ category: "interior" }),
      ]),
      description: faker.lorem.paragraph(),
      offer: faker.helpers.arrayElement(["YES", "NO"]),
      price: randomInt(80, 500),
      discount: faker.datatype.boolean() ? randomInt(5, 25) : 0,
      cancellation: faker.helpers.arrayElement(cancellationPolicies),
    });
    await roomRepo.save(room);

    const selected = faker.helpers.arrayElements(allAmenities, randomInt(3, 6));
    for (const amenity of selected) {
      const ra = roomAmenityRepo.create({
        roomNumber,
        amenity_id: amenity.id,
      });
      await roomAmenityRepo.save(ra);
    }
  }
}

async function seedUsers() {
  const userRepo = AppDataSource.getRepository(User);
  const jobRoles = ["Receptionist", "Manager", "Cleaner", "Chef", "Concierge"];
  const schedules = ["Morning", "Evening", "Night"];

  for (let i = 0; i < 20; i++) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);

    const user = userRepo.create({
      id: uuidv4(),
      photo: faker.image.avatar(),
      first_name,
      last_name,
      job: faker.helpers.arrayElement(jobRoles),
      email: faker.internet.email({
        firstName: first_name,
        lastName: last_name,
      }),
      phone_number: faker.phone.number(),
      start_date: faker.date.past({ years: 5 }),
      schedule: faker.helpers.arrayElement(schedules),
      function_description: faker.lorem.sentence(),
      password: hashedPassword,
    });
    await userRepo.save(user);
  }
}

async function seedBookings() {
  const bookingRepo = AppDataSource.getRepository(Booking);
  const roomRepo = AppDataSource.getRepository(Room);
  const roomNumbers = (await roomRepo.find()).map((r) => r.roomNumber);

  for (let i = 0; i < 50; i++) {
    const checkIn = faker.date.between({
      from: "2024-07-01",
      to: "2024-12-01",
    });
    const checkOut = faker.date.soon({
      days: randomInt(1, 14),
      refDate: checkIn,
    });
    const name = faker.person.fullName();
    const roomNumber = roomNumbers[i % roomNumbers.length];

    const booking = bookingRepo.create({
      id: uuidv4(),
      name,
      image: faker.image.avatar(),
      orderDate: faker.date.past(),
      checkIn,
      checkOut,
      specialRequest_status: faker.datatype.boolean() ? 1 : 0,
      specialRequest_text: faker.lorem.sentence(),
      roomType: faker.helpers.arrayElement(["Single", "Double", "Suite"]),
      roomNumber,
    });
    await bookingRepo.save(booking);
  }
}

const args = process.argv.slice(2);

AppDataSource.initialize().then(async () => {
  switch (args[0]) {
    case "amenities":
      await seedAmenities();
      break;
    case "rooms":
      await seedAmenities();
      await seedRooms();
      break;
    case "users":
      await seedUsers();
      break;
    case "bookings":
      await seedBookings();
      break;
    case "all":
      await seedAmenities();
      await seedRooms();
      await seedUsers();
      await seedBookings();
      break;
    default:
      console.log(
        "Usa: npx ts-node seed.ts [amenities|rooms|users|bookings|all]"
      );
  }
  process.exit(0);
});
