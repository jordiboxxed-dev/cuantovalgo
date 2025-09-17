export interface Item {
  name: string;
  price: number;
  emoji: string;
  quote: string;
}

export type Category = "comida" | "fiestas" | "transporte" | "random";

export const categories: Record<Category, Item[]> = {
  comida: [
    { name: "Alfajores Jorgito", price: 200, emoji: "🍪", quote: "Suficiente para una semana entera de meriendas épicas." },
    { name: "Milanesas con fritas", price: 1500, emoji: "🥩", quote: "¡El verdadero manjar de los campeones!" },
    { name: "Pizzas grandes", price: 3000, emoji: "🍕", quote: "Ideal para cortar la semana con amigos." },
    { name: "Empanadas", price: 300, emoji: "🥟", quote: "Nunca son suficientes, pero es un buen comienzo." },
    { name: "Facturas", price: 250, emoji: "🥐", quote: "Para acompañar esos mates mañaneros." },
    { name: "Choripanes", price: 800, emoji: "🌭", quote: "El sabor del fútbol y la amistad." },
    { name: "Kilos de helado", price: 2500, emoji: "🍦", quote: "Perfecto para ahogar las penas o celebrar la vida." },
  ],
  fiestas: [
    { name: "Birras Quilmes", price: 400, emoji: "🍺", quote: "La previa está asegurada con esto." },
    { name: "Fernet con coca", price: 1200, emoji: "🥃", quote: "El elixir cordobés que une a la Argentina." },
    { name: "Entradas de boliche", price: 2000, emoji: "🎟️", quote: "Para tirar unos pasos hasta que salga el sol." },
    { name: "Shots de tequila", price: 600, emoji: "🥳", quote: "Para empezar la noche con el pie derecho." },
    { name: "Ubers a las 6 AM", price: 1800, emoji: "🚕", quote: "El viaje de vuelta a casa, un clásico." },
  ],
  transporte: [
    { name: "Viajes en colectivo", price: 400, emoji: "🚌", quote: "Recorriendo la ciudad como un verdadero ciudadano." },
    { name: "Ubers de 10 minutos", price: 800, emoji: "🚗", quote: "Para llegar rápido y sin transpirar." },
    { name: "Tanques de nafta", price: 15000, emoji: "⛽", quote: "¡Sos un lujo! Más caro que la nafta." },
    { name: "Viajes en subte", price: 300, emoji: "🚇", quote: "Moviéndote por debajo de la locura de la ciudad." },
  ],
  random: [
    { name: "Sobres de figuritas", price: 200, emoji: "🃏", quote: "A ver si con esto llenás el álbum." },
    { name: "Rollos de papel higiénico", price: 150, emoji: "🧻", quote: "Un bien esencial, vales oro." },
    { name: "Cargadores de iPhone", price: 3000, emoji: "🔌", quote: "Más valioso que el propio teléfono." },
    { name: "Pares de medias perdidas", price: 100, emoji: "🧦", quote: "El misterio más grande de la humanidad." },
    { name: "Pares de chanclas Havaianas", price: 4000, emoji: "👣", quote: "Para un verano con todo el estilo." },
    { name: "Plantas suculentas", price: 800, emoji: "🌵", quote: "Le das un toque de verde a la vida." },
  ],
};

export interface CalculationParams {
  age: number;
  category: Category;
}

export interface CalculationResult {
  quantity: number;
  item: Item;
  totalValue: number;
}

export const calculateValue = ({ age, category }: CalculationParams): CalculationResult => {
  const baseValue = Math.random() * (150 - 15) + 15;
  const ageMultiplier = age > 25 ? 1.2 : 0.8;
  
  const categoryMultipliers: Record<Category, number> = {
    comida: 1.0,
    fiestas: 1.5,
    transporte: 0.7,
    random: Math.random() * (2.0 - 0.5) + 0.5,
  };

  const finalMultiplier = baseValue * ageMultiplier * categoryMultipliers[category];
  const totalValue = Math.floor(finalMultiplier * 1000);

  const itemsInCategory = categories[category];
  const randomItem = itemsInCategory[Math.floor(Math.random() * itemsInCategory.length)];

  const quantity = Math.floor(totalValue / randomItem.price);

  return {
    quantity,
    item: randomItem,
    totalValue,
  };
};