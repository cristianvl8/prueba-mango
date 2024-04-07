export async function getSliderFixedValues() {
    try {
      const response = await fetch('http://localhost:3001/exercise2');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
}