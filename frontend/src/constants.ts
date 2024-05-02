export const categories = [
  { name: "Fashion" },
  { name: "Clothes" },
  { name: "Electronics" },
  { name: "Fashion" },
  { name: "Clothes" },
  { name: "Electronics" },
];
export const brands = [
  { name: "Jumia" },
  { name: "handzy shop" },
  { name: "lilac milk" },
  { name: "spooky " },
  { name: "jellycat " },
  { name: "bellzi" },
];

export const heroSlides = [
  {
    id: 1,
    title: "        Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    subtitle:
      "Omnis voluptates vitae esse in iste vel dolorum nostrum eaque eius veritatis temporibus velit beatae error incidunt ",
    description:
      "explicabo harum optio accusamus, facilis nam quibusdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium. explicabo harum optio accusamus, facilis nam quibusdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium. explicabo harum optio accusamus, facilis nam quibusdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium.",
    image: "/assets/images/slide_1.jpg",
  },
  {
    id: 2,
    title: "voluptates vitae esse in iste vel dolorum nostrum eaque eiu ",
    subtitle:
      ", facilis nam quibusdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium. explicabo harum optio accusamus, facilis nam quibusda ",
    description:
      "voluptates vitae esse in iste vel dolorum nostrum eaque eius veritatis tempor sdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium. explicabo harum optio accusamus, facilis nam quibusdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium.",
    image: "/assets/images/slide_2.jpg",
  },
];

export const products = [
  {
    name: "Product 1",
    description: "Description of Product 1",
    category: "Category 1",
    tags: "Tag1, Tag2",
    original_price: 100000,
    discount_Price: 80000,
    id: 50,
    stock: 50,
    views: 50,
    is_fav: false,

    images: [
      {
        public_id: "image1_public_id",
        url: "/assets/images/product_1.jpg",
      },
      {
        public_id: "image2_public_id",
        url: "/assets/images/product_2.jpg",
      },
      {
        public_id: "image1_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image2_public_id",
        url: "/assets/images/product_4.jpg",
      },
      {
        public_id: "image2_public_id",
        url: "/assets/images/product_5.jpg",
      },
    ],
    reviews: [
      {
        id: "222",
        user: {
          name: "User1",
          email: "user1@example.com",
        },
        rating: 4,
        comment: "Nice product!",
        productId: "product_id_1",
        createdAt: "Apr 23 2024",
      },
      {
        id: "722",
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 4,
        comment:
          "Nice product! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut minima aperiam voluptatum exercitationem voluptas mollitia porro expedita fugit quod ipsum commodi, asperiores veniam quidem facere id dolor unde nam perspiciatis aliquam error quae.",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 4,
    shop_id: "shop_id_1",
    shop: {
      name: "Shop 1",
      location: "Location 1",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    tags: "Tag3, Tag4",
    original_price: 12000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_4.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_2",
    shop: {
      name: "Shop 2",
      location: "Location 2",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 3",
    description: "Description of Product 3",
    category: "Category 3",
    tags: "Tag3, Tag4",
    original_price: 13000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_5.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_6.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User3",
          email: "user3@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_3",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_3",
    shop: {
      name: "Shop 3",
      location: "Location 3",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 4",
    description: "Description of Product 4",
    category: "Category 4",
    tags: "Tag3, Tag4",
    original_price: 14000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_7.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_8.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User4",
          email: "user4@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_4",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_4",
    shop: {
      name: "Shop 4",
      location: "Location 4",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 5",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate accusamus consectetur accusantium veritatis nihil nostrum iste omnis recusandae. Asperiores eligendi nemo molestiae sunt officia in placeat suscipit facilis! In, facilis quia. Magnam in iusto voluptatibus, modi similique excepturi maxime nemo quisquam expedita atque facere culpa consequatur eaque! Deleniti earum laudantium cum voluptatem voluptas corrupti, id voluptates error a exercitationem sunt molestiae dolore asperiores, porro debitis. Adipisci libero possimus minima nostrum.",
    category: "Category 5",
    tags: "Tag3, Tag4",
    original_price: 15000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_9.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_10.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User5",
          email: "user5@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_5",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_5",
    shop: {
      name: "Shop 5",
      location: "Location 5",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 6",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate accusamus consectetur accusantium veritatis nihil nostrum iste omnis recusandae. Asperiores eligendi nemo molestiae sunt officia in placeat suscipit facilis! In, facilis quia. Magnam in iusto voluptatibus, modi similique excepturi maxime nemo quisquam expedita atque facere culpa consequatur eaque! Deleniti earum laudantium cum voluptatem voluptas corrupti, id voluptates error a exercitationem sunt molestiae dolore asperiores, porro debitis. Adipisci libero possimus minima nostrum.",
    category: "Category 6",
    tags: "Tag3, Tag4",
    original_price: 16000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_11.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_12.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User6",
          email: "user6@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_6",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_6",
    shop: {
      name: "Shop 6",
      location: "Location 6",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    tags: "Tag3, Tag4",
    original_price: 12000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_4.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_2",
    shop: {
      name: "Shop 2",
      location: "Location 2",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    tags: "Tag3, Tag4",
    original_price: 12000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_4.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_2",
    shop: {
      name: "Shop 2",
      location: "Location 2",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    tags: "Tag3, Tag4",
    original_price: 12000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_4.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_2",
    shop: {
      name: "Shop 2",
      location: "Location 2",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    tags: "Tag3, Tag4",
    original_price: 12000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_4.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_2",
    shop: {
      name: "Shop 2",
      location: "Location 2",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    tags: "Tag3, Tag4",
    original_price: 12000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_4.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_2",
    shop: {
      name: "Shop 2",
      location: "Location 2",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    category: "Category 2",
    tags: "Tag3, Tag4",
    original_price: 12000,
    discount_Price: 10000,
    id: 30,
    stock: 30,
    is_fav: true,
    images: [
      {
        public_id: "image3_public_id",
        url: "/assets/images/product_3.jpg",
      },
      {
        public_id: "image4_public_id",
        url: "/assets/images/product_4.jpg",
      },
    ],
    reviews: [
      {
        user: {
          name: "User2",
          email: "user2@example.com",
        },
        rating: 5,
        comment: "Great product!",
        productId: "product_id_2",
        createdAt: "Apr 23 2024",
      },
    ],
    ratings: 5,
    shop_id: "shop_id_2",
    shop: {
      name: "Shop 2",
      location: "Location 2",
    },
    sold_out: 0,
    createdAt: "Apr 23 2024",
  },
];

// Generate a random future date for the Finish_Date
function generateFutureDate() {
  const today = new Date();
  const futureDate = new Date(
    today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  ); // Add random number of milliseconds within the next 30 days
  return futureDate;
}

// Generate an array of events with random data
export const events = [];
for (let i = 0; i < 15; i++) {
  const event = {
    name: `Event ${i + 1}`,
    description: `Description of Event ${
      i + 1
    } voluptates vitae esse in iste vel dolorum nostrum eaque eius veritatis tempor sdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium. explicabo harum optio accusamus, facilis nam quibusdam, praesentium magni neque! Voluptatem tenetur expedita dolorum laudantium.`,
    category: `Category ${i + 1}`,
    start_Date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000), // Start date within the next 30 days
    finish_Date: generateFutureDate(),
    status: Math.random() < 0.5 ? "Running" : "Upcoming", // Randomly select Running or Upcoming
    tags: `Tag${i + 1}`,
    original_price: Math.floor(Math.random() * 1000) + 10, // Random original price between 10 and 1009
    discount_Price: Math.floor(Math.random() * 895) + 5, // Random discount price between 5 and 899
    stock: Math.floor(Math.random() * 100), // Random stock quantity between 0 and 99
    images: [
      {
        public_id: `image_${i + 1}_1`,
        url: `/assets/images/product_${i + 1}.jpg`,
      },
      {
        public_id: `image_${i + 1}_2`,
        url: `/assets/images/product_${i + 1}.jpg`,
      },
    ],
    shopId: `shop_${i + 1}`,
    shop: {
      name: `Shop ${i + 1}`,
      location: `Location ${i + 1}`,
    },
    sold_out: Math.floor(Math.random() * 50), // Random sold out count between 0 and 49
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random creation date within the last 30 days
  };
  events.push(event);
}

export const NewArrivals = [
  "/assets/images/colored_1.jpg",
  "/assets/images/colored_2.jpg",
  "/assets/images/colored_3.jpg",
  "/assets/images/colored_4.jpg",
  "/assets/images/colored_5.jpg",
  "/assets/images/colored_6.jpg",
  "/assets/images/colored_7.jpg",
  "/assets/images/colored_8.jpg",
];