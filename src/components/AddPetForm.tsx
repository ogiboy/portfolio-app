import axios from 'axios'

import { useEffect, useState } from 'react'

const AddPetForm = () => {
  const [petName, setPetName] = useState('')
  const [ownerName, setOwnerName] = useState<string>('')
  const [shownPets, setShownPets] = useState([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      petName &&
        ownerName &&
        (await axios.post('/api/add-pet', { petName, ownerName }))
      setPetName('')
      setOwnerName('')
    } catch (error) {
      console.error('error adding pet', error)
    } finally {
      handleShowPets()
    }
  }

  const handleShowPets = async () => {
    try {
      const response = await axios.get('/api/see-pets')
      setShownPets(response.data)
    } catch (error) {
      console.log('error fetching pets', error)
    }
  }

  useEffect(() => {
    handleShowPets()
  }, [])

  // useEffect(() => {
  //   console.log(shownPets)
  // }, [shownPets])

  return (
    <div className="w-96 min-h-96 my-5 rounded border-2 flex flex-col justify-around items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="border-2 rounded-lg w-4/5 mx-auto my-10 flex flex-col justify-center items-center"
      >
        <label className="my-1" htmlFor="pets">
          Add Pet
        </label>

        <input
          className="border rounded-lg my-1 p-1 w-2/3"
          type="text"
          id="pets"
          onChange={(e) => setPetName(e.target.value)}
          value={petName}
          placeholder="Pet Name"
        />
        <input
          className="border rounded-lg my-1 p-1 w-2/3"
          type="text"
          id="owner"
          onChange={(e) => setOwnerName(e.target.value)}
          value={ownerName}
          placeholder="Owner Name"
        />

        <button
          className="border rounded-md py-1 px-3 mx-auto my-3 hover:bg-slate-300 hover:text-slate-700"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div>
        <p>Recently added pets</p>
      </div>
      <div className="rounded border-2 w-4/5 min-h-36 my-5 truncate">
        {shownPets.map((pet: any) => (
          <ul key={pet.id}>
            <li>{pet.name}</li>
            <li>{pet.owner}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}
export default AddPetForm
