//funzione per le stelline
export default function Stars({ valutazione }) {
  let stars = ""
  for (let i = 0; i < valutazione; i++) {
    stars += "⭐"
  }
  return stars

}