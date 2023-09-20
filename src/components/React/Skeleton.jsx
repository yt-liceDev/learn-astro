export default function Skeleton() {
  const loop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  return (
    <section className="grid w-[80vw] mx-auto py-8 grid-cols-5 gap-3">
      {loop.map((item) => (
        <div key={item} className="bg-white h-44 rounded-md ">
          <figure className="block w-full h-32 bg-gray-300"></figure>
          <div className="bg-gray-300 rounded-xl w-2/3 h-3 mt-4"></div>
        </div>
      ))}
    </section>
  )
}
