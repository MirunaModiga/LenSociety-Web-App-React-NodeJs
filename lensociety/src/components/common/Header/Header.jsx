import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Header.css';
import { Person } from "react-bootstrap-icons";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import { PersonAdd } from "react-bootstrap-icons";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Explore', href: '/#explore', current: false },
  { name: 'Book Photoshoot', href: '/services', current: false },
  { name: 'About Us', href: '/about', current: false },
  { name: 'Contact', href: '#footer', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [currentPage, setCurrentPage] = useState('/');
  const loc = useLocation();

  useEffect(() => {
    setCurrentPage(loc.pathname);
  }, [loc]);

  const { currentUser } = useSelector(state => state.user);

  return (
    <Disclosure as="nav" className="bg-current">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/img/logo.png"
                    alt="LenSociety"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setCurrentPage(item.href)}
                        className={classNames(
                          item.href === currentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.href === currentPage ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">

                  {currentUser ? (
                    <a href={currentUser.usertype === 'admin' ? "/user/settings" : "/user"}
                     className="flex px-4 py-2 text-sm text-gray-700">
                      <Menu.Button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <Person className="h-8 w-8 rounded-full" aria-hidden="true" />
                      </Menu.Button>
                    </a>
                  ) :
                    (
                      <div className="sign">
                        <Menu.Button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <Person className="h-8 w-8 rounded-full" aria-hidden="true" />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/login/Buyer"
                                  className={classNames(active ? 'bg-gray-100' : '', 'flex px-4 py-2 text-sm text-gray-700')}
                                ><BoxArrowInLeft className="bi icon" />
                                  LogInViewer
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/login/Contributor"
                                  className={classNames(active ? 'bg-gray-100' : '', 'flex px-4 py-2 text-sm text-gray-700')}
                                ><BoxArrowInLeft className="bi icon" />
                                  LogInContributor
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/signup"
                                  className={classNames(active ? 'bg-gray-100' : '', 'flex px-4 py-2 text-sm text-gray-700')}
                                ><PersonAdd className="bi icon" />
                                  SignUp
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </div>
                    )}
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => setCurrentPage(item.href)}
                  className={classNames(
                    item.href === currentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.href === currentPage ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
