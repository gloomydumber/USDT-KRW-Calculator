import { useEffect } from "react"
import { of } from "rxjs"

function App() {

  useEffect(() => {
    const obs1$ = of(1, 2, 3, 4, 5);
    obs1$.subscribe(item => console.log(`of : ${item}`));
  }, []);
  return (
    <>
    </>
  )
}

export default App
