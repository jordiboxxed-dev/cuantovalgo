export type Persona = "foodie" | "fiestero" | "casero" | "aventurero";

export interface Item {
  name: string;
  price: number;
  emoji: string;
  quote: string;
  personas?: Persona[];
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
    { name: "Kilos de helado", price: 2500, emoji: "🍦", quote: "Perfecto para ahogar las penas o celebrar la vida.", personas: ["casero"] },
    { name: "Cenas de 3 pasos", price: 12000, emoji: "🍷", quote: "Para paladares exigentes como el tuyo.", personas: ["foodie"] },
    { name: "Ramen Tonkotsu", price: 4500, emoji: "🍜", quote: "Un viaje de ida a Japón.", personas: ["foodie"] },
  ],
  fiestas: [
    { name: "Birras Quilmes", price: 400, emoji: "🍺", quote: "La previa está asegurada con esto." },
    { name: "Fernet con coca", price: 1200, emoji: "🥃", quote: "El elixir cordobés que une a la Argentina." },
    { name: "Entradas de boliche", price: 2000, emoji: "🎟️", quote: "Para tirar unos pasos hasta que salga el sol.", personas: ["fiestero"] },
    { name: "Shots de tequila", price: 600, emoji: "🥳", quote: "Para empezar la noche con el pie derecho.", personas: ["fiestero"] },
    { name: "Ubers a las 6 AM", price: 1800, emoji: "🚕", quote: "El viaje de vuelta a casa, un clásico.", personas: ["fiestero"] },
    { name: "Entradas a un festival", price: 25000, emoji: "🎶", quote: "¡A vivir la música a pleno!", personas: ["fiestero", "aventurero"] },
  ],
  transporte: [
    { name: "Viajes en colectivo", price: 400, emoji: "🚌", quote: "Recorriendo la ciudad como un verdadero ciudadano." },
    { name: "Ubers de 10 minutos", price: 800, emoji: "🚗", quote: "Para llegar rápido y sin transpirar." },
    { name: "Tanques de nafta", price: 15000, emoji: "⛽", quote: "¡Sos un lujo! Más caro que la nafta." },
    { name: "Viajes en subte", price: 300, emoji: "🚇", quote: "Moviéndote por debajo de la locura de la ciudad." },
    { name: "Pasajes de avión a Bariloche", price: 80000, emoji: "✈️", quote: "¡Rajemos de acá!", personas: ["aventurero"] },
  ],
  random: [
    { name: "Sobres de figuritas", price: 200, emoji: "🃏", quote: "A ver si con esto llenás el álbum." },
    { name: "Rollos de papel higiénico", price: 150, emoji: "🧻", quote: "Un bien esencial, vales oro." },
    { name: "Cargadores de iPhone", price: 3000, emoji: "🔌", quote: "Más valioso que el propio teléfono." },
    { name: "Pares de medias perdidas", price: 100, emoji: "🧦", quote: "El misterio más grande de la humanidad." },
    { name: "Pares de chanclas Havaianas", price: 4000, emoji: "👣", quote: "Para un verano con todo el estilo." },
    { name: "Plantas suculentas", price: 800, emoji: "🌵", quote: "Le das un toque de verde a la vida." },
    { name: "Suscripciones a Netflix", price: 3500, emoji: "📺", quote: "Maratonear series es tu superpoder.", personas: ["casero"] },
    { name: "Libros de fantasía", price: 7000, emoji: "📚", quote: "Para viajar a otros mundos sin moverte del sillón.", personas: ["casero"] },
    { name: "Equipos de mate premium", price: 15000, emoji: "🧉", quote: "Un matero de ley como vos se lo merece.", personas: ["casero", "foodie"] },
    { name: "Carpas para 2 personas", price: 40000, emoji: "⛺", quote: "Listo para la próxima aventura en la naturaleza.", personas: ["aventurero"] },
  ],
};

export interface CalculationParams {
  age: number;
  category: Category;
  persona: Persona | null;
}

export interface CalculationResult {
  quantity: number;
  item: Item;
  totalValue: number;
}

export const calculateValue = ({ age, category, persona }: CalculationParams): CalculationResult => {
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

  const allItemsInCategory = categories[category];
  
  let personalizedItems = allItemsInCategory.filter(item => !item.personas);
  if (persona) {
    const personaSpecificItems = allItemsInCategory.filter(item => item.personas?.includes(persona));
    personalizedItems = [...personalizedItems, ...personaSpecificItems];
  }

  const itemsToChooseFrom = personalizedItems.length > 0 ? personalizedItems : allItemsInCategory;
  const randomItem = itemsToChooseFrom[Math.floor(Math.random() * itemsToChooseFrom.length)];

  const quantity = Math.floor(totalValue / randomItem.price);

  return {
    quantity,
    item: randomItem,
    totalValue,
  };
};