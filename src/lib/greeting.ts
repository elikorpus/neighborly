const MORNING = ['Good morning', 'Morning', 'Rise and shine', 'Top of the morning'];
const AFTERNOON = ['Good afternoon', 'Afternoon', 'Hope your day is going well'];
const EVENING = ['Good evening', 'Evening', 'Hope you had a good one today'];
const NIGHT = ['Good night', 'Still up', 'Burning the midnight oil', "Can't sleep"];

/** Time-of-day greeting, randomized per call so it varies each time the screen mounts. */
export function randomGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  const pool = hour < 5 ? NIGHT : hour < 12 ? MORNING : hour < 17 ? AFTERNOON : hour < 21 ? EVENING : NIGHT;
  return pool[Math.floor(Math.random() * pool.length)];
}
