// This safety shield ensures the HTML is 100% loaded before the JS runs
document.addEventListener("DOMContentLoaded", () => {
  // Data structure
  const productsTrue = [
    {
      id: "Blue Dragon",
      image: "../assets/img/adopt1.png",
      name: "Blue Dragon – Azuron",
      rating: { stars: 3, genre: "Friendly Ally" },
      price: 2500,
      markdownPrice: 5000,
      description:
        "Azuron is a curious little dragon with a spark of mischief in his eyes. He loves exploring hidden nooks and curling up in warm spots after a playful flight, leaving tiny trails of blue sparks wherever he goes. He thrives on attention and gentle play, and his favorite games involve chasing floating spark orbs around the room",
      bed: "Cozy lava-foam bed",
      treats: "Frostberry treats",
      toys: "Flame-safe balls, Wing-wrangling hoops, Tiny treasure chests",
      uniqueItem: "Mini Fire Orb",
      item: true,
    },
    {
      id: "Griffin",
      image: "../assets/img/adopt3.png",
      name: "Griffin – Aurelia",
      rating: { stars: 3, genre: "Friendly Ally" },
      price: 6500,
      description:
        "Aurelia is a proud little griffin, courageous yet gentle. She loves climbing, exploring high perches, and curling up near those she trusts, always watching the world with wise golden eyes. She adores gentle games of chase and loves to show off her tiny but majestic wings",
      bed: "Feather-lined perch bed",
      treats: "Sunfruit treats",
      toys: "Wing rings, Soft talon toys, Mini prey plushies",
      uniqueItem: "Tiny Sunstone Perch",
      item: true,
    },
    {
      id: "Pegasus",
      image: "../assets/img/adopt5.png",
      name: "Pegasus – Starwind",
      rating: { stars: 4, genre: "Gentle Guardian" },
      price: 5000,
      description:
        "Starwind is a gentle, curious Pegasus foal with a playful spirit. He loves short flights and sunny naps, his gleaming wings always ready for discovery. He enjoys small games of chase and nuzzles to show affection, quickly forming strong bonds with those he trusts.",
      bed: "Soft cloud bed",
      treats: "Starhay treats",
      toys: "Flying hoops, Feathered balls, Small riding saddle",
      uniqueItem: "Mini Wind Hoof Ball",
      item: true,
    },
    {
      id: "Forest Spirit",
      image: "../assets/img/adopt6.png",
      name: "Forest Spirit – Briar",
      rating: { stars: 5, genre: "Beloved Companion" },
      price: 3500,
      description:
        "Briar is a tiny guardian of the woods, curious, gentle, and full of life. He loves leafy hideaways and quietly exploring gardens, always humming with a touch of magic. He enjoys collecting small natural treasures and bringing them to his caretakers as gifts, showing his playful personality.",
      bed: "Mossy bed",
      treats: "Berry treats",
      toys: "Twig rattles, Leaf dolls, Acorn balls",
      uniqueItem: "Mini Leafy Hideout",
      item: false,
    },
  ];

  const productsFalse = [
    {
      id: "Kitsune",
      image: "../assets/img/adopt2.png",
      name: "Kitsune – Yuki",
      rating: { stars: 4, genre: "Gentle Guardian" },
      price: 4500,
      description:
        "Yuki is a mischievous yet loving fox spirit, full of curiosity and clever ideas. She delights in playful tricks and quietly watching over her friends, her tails swishing with contentment. Yuki especially enjoys interactive games and hiding small trinkets to surprise her caretakers",
      bed: "Silk-lined den bed",
      treats: "Moonfruit snacks",
      toys: "Puzzle cubes, Jingling bells, Magical ribbons",
      uniqueItem: "Mini Spirit Lantern",
      item: false,
    },
    {
      id: "Water Wisp",
      image: "../assets/img/adopt4.png",
      name: "Water Wisp – Lumina",
      rating: { stars: 5, genre: "Beloved Companion" },
      price: 40000,
      description:
        "Lumina drifts like a shimmer of moonlight, soft and gentle. Playful and curious, she glides through her surroundings, bringing calm and quiet magic wherever she goes. She loves to follow gentle ripples in water or light games, leaving a faint glowing trail that enchants everyone nearby.",
      bed: "Crystal bowl bed",
      treats: "Dewdrop nectar",
      toys: "Floating orbs, Ripple rings, Water bell",
      uniqueItem: "Mini Waterfall Sphere",
      item: false,
    },
    {
      id: "Forest Spirit",
      image: "../assets/img/adopt6.png",
      name: "Forest Spirit – Briar",
      rating: { stars: 5, genre: "Beloved Companion" },
      price: 3500,
      description:
        "Briar is a tiny guardian of the woods, curious, gentle, and full of life. He loves leafy hideaways and quietly exploring gardens, always humming with a touch of magic. He enjoys collecting small natural treasures and bringing them to his caretakers as gifts, showing his playful personality.",
      bed: "Mossy bed",
      treats: "Berry treats",
      toys: "Twig rattles, Leaf dolls, Acorn balls",
      uniqueItem: "Mini Leafy Hideout",
      item: false,
    },
  ];

  let showTrueProducts = true;

  if (showTrueProducts) {
    renderProducts(productsTrue);
  } else {
    renderProducts(productsFalse);
  }

  function renderProducts(products) {
    const container = document.getElementById("catalog");
    if (!container) return;

    products.forEach((product, index) => {
      const starIcons = "★".repeat(product.rating.stars);
      const oddOrEven = index % 2 === 0 ? "odd" : "even";

      // Notice the onclick now passes the product details to cart.js!
      const html = `
        <section class="sell_item ${oddOrEven}">
          <div class="image">
            <img src="${product.image}" />
          </div>
          <div class="text">
            <h2>${product.name}</h2>
            <div class="price">
              R${product.price} ${product.markdownPrice ? "<s>R" + product.markdownPrice + "</s>" : ""}
            </div>
            <div class="rating">
              <span class="stars">${starIcons}</span> ${product.rating.genre}
            </div>
            <div class="p">${product.description}</div>
                       <div class="add">
              <div class="stepper">
                <button onclick="changeQuantity(this, -1)">−</button>
                <input type="number" value="0" min="0" max="1000" 
                  data-product-id="${product.id}" 
                  data-name="${product.name}" 
                  data-price="${product.price}" 
                  onchange="updateCartFromInput(this)" />
                <button onclick="changeQuantity(this, 1)">+</button>
              </div>
              <button class="button">Add to Cradle</button> <!-- Now just a secondary visual button -->
            </div>
            <div class="info-container">
              <span class="label">Bed</span><span class="colon">:</span><span class="value">${product.bed}</span>
              <span class="label">Treats</span><span class="colon">:</span><span class="value">${product.treats}</span>
              <span class="label">Toys</span><span class="colon">:</span><span class="value">${product.toys}</span>
              <span class="label">Unique Item</span><span class="colon">:</span><span class="value">${product.uniqueItem}</span>
            </div>
          </div>
        </section>
      `;

      container.insertAdjacentHTML("beforeend", html);
    });
  }
});
