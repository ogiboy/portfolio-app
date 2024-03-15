import { sql } from '@vercel/postgres'
import { useState } from 'react'

const AddPetForm = () => {
  const [petName, setPetName] = useState('')
  const [shownPets, setShownPets] = useState([])

  const handlePetSubmit = async (e) => {
    console.log({
      POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    })
    e.preventDefault()
    const { pets } = await sql`SELECT * FROM pets`
  }

  return (
    <div>
      <form
        className="border-2 rounded-lg w-5/12 mx-auto my-10 flex flex-col justify-center items-center"
        onSubmit={(e) => handlePetSubmit(e)}
      >
        <label className="my-1" htmlFor="pets">
          Add Pet
        </label>

        <input
          className="border rounded-lg my-1 sm:max-w-5"
          type="text"
          id="pets"
          onChange={(e) => setPetName(e.target.value)}
          value={petName}
        />

        <button
          className="border rounded-md py-1 px-3 mx-auto my-3 hover:bg-slate-300"
          type="submit"
        >
          Submit
        </button>
        <button
          type="button"
          className="border rounded-md py-1 px-3 mx-auto my-3 hover:bg-slate-300"
        >
          See Pets
        </button>
      </form>
    </div>
  )
}
export default AddPetForm
