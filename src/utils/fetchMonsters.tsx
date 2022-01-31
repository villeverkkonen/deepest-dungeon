export async function fetchMonsters() {
  try {
    const result = await fetch('/monsters');
    const data = await result.json();
    return data['results'];
  } catch (e) {
    console.log(e);
    return [];
  }
}
