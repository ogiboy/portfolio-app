import { closeModal } from '@/app/features/modal/modalSlice'
import { Dialog, Transition } from '@headlessui/react'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const Modal = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((store) => store.modal)

  return (
    <Transition show={isOpen} appear>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        className="absolute bottom-20 z-50 w-full text-center"
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="rounded mx-auto">
            <Dialog.Title as="h3" className="font-bold">
              So Sorry To Show You This Error But...
            </Dialog.Title>
            <Dialog.Description>I just need more time.</Dialog.Description>

            <button className="" onClick={() => onClose()}>
              <MdOutlineClose />
            </button>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
export default Modal

//
//
