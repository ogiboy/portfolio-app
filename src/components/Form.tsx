import axios from 'axios'
import orderBy from 'lodash/orderBy'
import Loading from '@/app/dashboard/loading'

import { Suspense, useEffect, useState } from 'react'
import { BiSortUp } from 'react-icons/bi'
import { BiSortDown } from 'react-icons/bi'

const Form = () => {
  const [petName, setPetName] = useState<string>('')
  const [ownerName, setOwnerName] = useState<string>('')
  const [shownPets, setShownPets] = useState([])
  const [sort, setSort] = useState<'asc' | 'desc'>('desc')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (petName && ownerName) {
        const date = new Date()
        await axios.post('/api/add-pet', { date, petName, ownerName })
      } else {
        throw new Error('petname ownername not found')
      }
    } catch (error) {
      console.error('error adding pet', error)
    } finally {
      setPetName('')
      setOwnerName('')
      handleShowPets()
    }
  }

  const handleShowPets = async () => {
    // console.log('handleshownpets runing')
    try {
      const response = await axios.get('/api/see-pets')
      console.dir(response.data)
      if (!response) {
        throw new Error('see-pets doesnt work')
      } else {
        setShownPets(response.data)
      }
    } catch (error) {
      console.log('error fetching pets', error)
    }
  }

  useEffect(() => {
    handleShowPets()
  }, [])

  // useEffect(() => {
  //   console.log('useEffect shownPets:' + shownPets)
  // }, [shownPets])

  const sortUpBtnImage = <BiSortUp />
  const sortDownBtnImage = <BiSortDown />

  return (
    <div className="w-96 min-h-96 my-5 rounded border-2 dark:border-slate-300 border-slate-700 flex flex-col justify-around items-center cursor-default">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="border-2 dark:border-slate-300 border-slate-700 rounded-lg w-4/5 mx-auto my-10 flex flex-col justify-center items-center"
      >
        <label className="my-1" htmlFor="pets">
          Drop a comment
        </label>

        <input
          className="border caret-indigo-700 dark:caret-indigo-700 rounded-lg my-1 p-1 w-2/3 shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500"
          type="text"
          id="pets"
          onChange={(e) => setOwnerName(e.target.value)}
          value={ownerName}
          placeholder="Your name"
          autoComplete="name given-name"
          required
        />
        <textarea
          className="border caret-indigo-700 dark:caret-indigo-700 resize-none rounded-lg my-1 p-1 w-2/3 shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500"
          id="owner"
          name="owner"
          onChange={(e) => setPetName(e.target.value)}
          value={petName}
          placeholder="Comment goes here"
          required
        />

        <button
          className="active:ring-2 border  rounded-md py-1 px-3 mx-auto my-3 hover:bg-slate-300 hover:text-slate-700"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="w-4/5 h-fit flex justify-evenly items-center">
        <p className="underline w-4/5 h-fit text-lg text-center">
          Recently added comments
        </p>
        <button
          onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}
          className="active:ring-2 w-8 h-8 flex justify-evenly items-center scale-125 shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500 rounded-lg"
        >
          {sort === 'asc' ? sortUpBtnImage : sortDownBtnImage}
        </button>
      </div>
      <div className="rounded border-2 dark:border-slate-300 border-slate-700 w-4/5 min-h-36 max-h-60 my-5 overflow-scroll">
        <ul>
          <Suspense fallback={<div>Loading...</div>}>
            {orderBy(shownPets, 'date', sort).map((pet: any) => (
              <figure
                className=" min-h-16 active:ring-2 px-1 py-1 mx-2 my-1 hover:shadow-lg shadow-slate-400 hover:shadow-slate-500 dark:shadow-slate-800 dark:hover:shadow-slate-500 rounded-2xl"
                key={pet.date}
              >
                <blockquote>
                  <p>&quot;{pet.petName}&quot;</p>
                </blockquote>
                <figcaption className="text-right">
                  <cite>-{pet.owner}</cite>
                </figcaption>
                <hr />
              </figure>
            ))}
          </Suspense>
        </ul>
      </div>
    </div>
  )
}
export default Form
