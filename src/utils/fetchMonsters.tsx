export async function fetchMonsters() {
  try {
    const result = await fetch('/api/monsters');
    const data = await result.json();
    return data['results'];
  } catch (e) {
    console.log(e);
    return [];
  }
}
