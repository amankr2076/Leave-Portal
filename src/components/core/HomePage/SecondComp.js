'use client'
import second from '../../../assets/second.png'
import fourth from '../../../assets/fourth.png'
import fifth from '../../../assets/fifth.png'
import sixth from '../../../assets/sixth.png'
import seventh from '../../../assets/seventh.webp'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, MinusSmallIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const faqs = [
  {
    question: "How can I register to this portal?",
    answer:
      "You don't need to register, you just need to log in.",
  },
  {
    question: "How to apply for a leave?",
    answer:
      "Just Login to the portal and apply.",
  },
  {
    question: "Can I see all my leave history?",
    answer:
      "Yes.",
  },
  {
    question: "Do I need to submit the supporting document?",
    answer:
      "yes, but the document need to be submitted at office",
  },
  {
    question: "where can i get the application form?",
    answer:
      "Applicatio form will be generated once you enter all the details.",
  },
  {
    question: "Do i need to take prinOut of the form?",
    answer:
      "Yes tak printOut and submit to the office.",
  },
  {
    question: "How will i know the update about my application?",
    answer:
      "You will receive an email for the updates.",
  },
  // More questions...
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SecondComp() {

  const { token } = useSelector((state)=>state.auth);

  return (
    <div className="bg-white">

      <main>
        {/* Pricing section */}
        <div className="mx-auto max-w-7xl px-6 mt-[-80px] lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* <h1 className="text-base/7 font-semibold text-indigo-600">Pricing</h1> */}
            <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              A Platform For Your Leaves
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
            A Management Portal where you can manage all your Leaves of your college
          </p>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto mt-24 w-full px-28">
          <div className="flex gap-28 ml-5">
            <img
              alt="Transistor"
              src={second}
            //   width={250}
            //   height={80}
              className="h-[160px] object-contain"
            />
            <img
              alt="Reform"
              src={fourth}
            //   width={158}
            //   height={48}
              className="h-[160px] object-contain"
            />
            <img
              alt="Tuple"
              src={fifth}
            //   width={158}
            //   height={48}
              className="h-[160px] object-contain"
            />
            <img
              alt="SavvyCal"
              src={sixth}
            //   width={158}
            //   height={48}
              className="h-[190px] object-contain"
            />
          </div>

        </div>

        {/* Testimonial section */}
        <div className="mx-auto mt-24 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              className="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0"
            />
            <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
            <div aria-hidden="true" className="absolute -left-80 -top-56 transform-gpu blur-3xl">
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
              />
            </div>
            <div
              aria-hidden="true"
              className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
              />
            </div>
            <div className="relative mx-auto max-w-2xl lg:mx-0">
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/workcation-logo-white.svg"
                className="h-12 w-auto"
              />
              <figure>
                <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl/8">
                  <p>
                    “The Leave Management Portal has completely transformed the way we handle student leave requests. What once required long queues and paperwork can now be done in just a few clicks. As a student, I can easily apply for leave, track my application status, and even receive instant updates via email.”
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-base text-white">
                  <div className="font-semibold">Ritika Sharma</div>
                  <div className="mt-1">B.Tech 3rd Year, Department of Computer Science</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto my-24 max-w-7xl px-6 sm:my-56 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
                <Disclosure key={faq.question} as="div" className="pt-6">
                {({ open }) => (
                    <>
                    <dt>
                        <Disclosure.Button className="group flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base/7 font-semibold">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                            <PlusSmallIcon
                            aria-hidden="true"
                            className={`h-6 w-6 ${open ? "hidden" : "block"}`}
                            />
                            <MinusSmallIcon
                            aria-hidden="true"
                            className={`h-6 w-6 ${open ? "block" : "hidden"}`}
                            />
                        </span>
                        </Disclosure.Button>
                    </dt>
                    <Transition
                        show={open}
                        enter="transition-all duration-500 ease-out"
                        enterFrom="max-h-0 opacity-0"
                        enterTo="max-h-screen opacity-100"
                        leave="transition-all duration-500 ease-in"
                        leaveFrom="max-h-screen opacity-100"
                        leaveTo="max-h-0 opacity-0"
                    >
                        <Disclosure.Panel as="dd" className="mt-2 pr-12 overflow-hidden">
                        <p className="text-base/7 text-gray-600">{faq.answer}</p>
                        </Disclosure.Panel>
                    </Transition>
                    </>
                )}
                </Disclosure>
            ))}
            </dl>
        </div>
        </div>
      </main>

    </div>
  )
}