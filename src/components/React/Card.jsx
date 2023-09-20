import { useEffect, useState } from "react"
import Button from "./Button"
import Skeleton from "./Skeleton"

export default function Card() {
  const [pokemon, setPokemon] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    const controller = new AbortController()
    const url = isEmpty(pokemon) ? import.meta.env.PUBLIC_BASE_URL : pokemon.next

    async function getPokemon() {
      const signal = controller.signal
      const res = await fetch(url, { signal })
      const data = await res.json()

      if (isEmpty(pokemon)) {
        setPokemon(data)
      } else {
        setPokemon((old) => ({
          ...data,
          results: [...old.results, ...data.results],
        }))
      }
      setIsLoading(false)
    }

    getPokemon()

    return () => {
      controller.abort()
    }
  }, [page])

  return isEmpty(pokemon) ? (
    <Skeleton />
  ) : (
    <>
      <section className="grid grid-cols-5 gap-3">
        {pokemon.results?.map((item) => (
          <a key={item.name} href={`/pokedex/${item.name}`}>
            <div className="bg-white rounded-md transition-transform duration-200 ease-in-out hover:-translate-y-2">
              <figure className="block w-full">
                <img
                  src={`${import.meta.env.PUBLIC_IMG_URL}/${item.url
                    .slice(34)
                    .replace("/", "")}.png`}
                  alt="poke"
                />
              </figure>
              <div className="py-4">
                <p className="text-slate-800 text-lg text-center">{item.name}</p>
              </div>
            </div>
          </a>
        ))}
      </section>
      <div className="text-center mt-8">
        <Button onClick={() => setPage(page + 1)} disabled={isLoading}>
          Load More Pokemon
        </Button>
      </div>
    </>
  )
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) return false
  }
  return true
}
