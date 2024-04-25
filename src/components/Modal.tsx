import { closeModal } from '@/app/features/modal/modalSlice'
import { RootState } from '@/app/store'

import { MdOutlineClose } from 'react-icons/md'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'

import resume from '../../public/myResume.pdf'

const Modal = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((store: RootState) => store.modal)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (isOpen && iframeRef.current) {
      iframeRef.current.focus()
    }
  }, [isOpen])

  return (
    <Transition show={isOpen} appear>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        className="absolute top-10 left-10 text-center w-2/3 h-2/3 flex flex-col justify-between"
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
          className="grow"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className="rounded mx-auto relative h-full w-full flex flex-col items-center justify-between">
              <Dialog.Title as="h3" className="font-bold my-2">
                my Resume
              </Dialog.Title>
              <Dialog.Description
                as="div"
                className="w-full h-full flex justify-center"
              >
                <iframe
                  src={resume}
                  className="w-full px-10 mx-auto z-50"
                  title="pdf viewer"
                  tabIndex={0}
                  ref={iframeRef}
                ></iframe>
              </Dialog.Description>

              <button
                className="border-2 my-2"
                onClick={() => dispatch(closeModal())}
              >
                <MdOutlineClose />
              </button>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
export default Modal

//
//
